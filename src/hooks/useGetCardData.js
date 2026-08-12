import generateJWT from "@/utils/generateJWT";
import { useCallback, useEffect, useState } from "react";

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [500, 1000, 2000];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useGetCardData() {
  const [cardData, setCardData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchOnce = async () => {
      const jwt = generateJWT(
        process.env.NEXT_PUBLIC_LL_API_KEY,
        process.env.NEXT_PUBLIC_LL_API_SECRET,
        process.env.NEXT_PUBLIC_LL_USERNAME
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TERMS_URL}${process.env.NEXT_PUBLIC_URL_PROGRAM}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwt,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Card data request failed with status ${response.status}`);
      }
      const data = await response.json();
      if (!data?.business?.name || !data?.terms) {
        throw new Error("Card data response is missing required fields");
      }
      return {
        business: data.business.name,
        collectValue: data.collectValue,
        description: data.description,
        terms: data.terms,
      };
    };

    const getCardData = async () => {
      setIsLoading(true);
      setError(false);
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const result = await fetchOnce();
          if (!cancelled) {
            setCardData(result);
            setIsLoading(false);
          }
          return;
        } catch (e) {
          console.log(e);
          const isLastAttempt = attempt === MAX_ATTEMPTS - 1;
          if (isLastAttempt) {
            if (!cancelled) {
              setCardData(false);
              setError(true);
              setIsLoading(false);
            }
            return;
          }
          await wait(RETRY_DELAYS_MS[attempt] ?? 1000);
        }
      }
    };

    getCardData();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return {
    cardData,
    isLoading,
    error,
    retry,
  };
}
