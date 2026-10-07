"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "./PhoneInput";
import { useFlagStore } from "@/app/stores/flagStore";
import CustomSpinner from "./CustomSpinner";
import checkUser from "@/utils/checkUser";
import enrollUser from "@/utils/enrollUser";
import addUser from "@/utils/addUser";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import { useRegisteredStore } from "@/app/stores/registeredStore";

export default function CustomForm() {
  const [termsAccepted, setTermsAccepted] = useState("true");
  const flag = useFlagStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const setRegistered = useRegisteredStore((state) => state.setRegistered);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const enrollProcess = async (data) => {
    data.phone = `${flag.code}${data.phone}`;
    const payload = {
      customerData: {
        Nombre: data.name,
        "Número telefónico": data.phone,
        "Correo electrónico": data.email,
      },
    };
    console.log(payload);
    const check = await checkUser(payload);
    if (check.userExists || !check.ok) {
      setIsLoading(false);
      setEnrollError(check.errors);
      return;
    }

    const enroll = await enrollUser(payload);
    if (!enroll.ok) {
      setIsLoading(false);
      setEnrollError(enroll.errors);
      return;
    }

    //Take the user to the card website if the registration finished successfully

    const add = await addUser({
      ...payload,
      pid: enroll.pid,
      cardLink: enroll.url,
    });

    console.log({ add });
    if (!add) {
      const cardURL = `https://q.passkit.net/~/#/p/${enroll.pid}`;
      window.location.replace(cardURL);
    } else {
      setRegistered({ registered: true, email: data.email });
      router.push("/exito");
    }
  };
  const onSubmit = async (data) => {
    setShowModal(true);
    setEnrollError("");
  };

  const inputBase =
    "w-full rounded-xl border border-gray-300 bg-transparent py-3 pr-3 text-zinc-800 placeholder:text-gray-400 focus:outline-none focus:border-secondary";
  const iconCls =
    "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500";
  const labelCls = "block mb-2 font-bold text-gray-900 text-left";
  const errCls = "text-sm text-red-600 text-left mt-1";

  return (
    <div>
      {showModal ? (
        <ConfirmationModal
          setIsLoading={setIsLoading}
          setShowModal={setShowModal}
          enrollProcess={enrollProcess}
          name={watch("name")}
          email={watch("email")}
          phone={watch("phone")}
        />
      ) : null}

      <h2 className="text-3xl font-extrabold text-gray-900 text-left">
        Únete al <span className="text-secondary">Club Superfina</span>
      </h2>
      <p className="text-gray-700 text-left mt-1">
        Completa tus datos y comienza a disfrutar de todos los beneficios.
      </p>

      {enrollError && <p className="text-red-500 mt-3">{enrollError}</p>}
      <form
        action=""
        id="user-form"
        className="needs-validation mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label className={labelCls} htmlFor="nombre">
            Nombre y Apellido
          </label>
          <div className="relative">
            <svg className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            <input
              id="nombre"
              placeholder="Tu nombre y apellido"
              className={`${inputBase} pl-11`}
              {...register("name", {
                required: {
                  value: true,
                  message: "Por favor ingresa tu nombre y apellido.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede tener más de 50 caracteres.",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres.",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "El nombre solo puede contener letras.",
                },
              })}
            />
          </div>
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelCls} htmlFor="numero">
              Número telefónico
            </label>
            <div className="flex flex-row items-center rounded-xl border border-gray-300 focus-within:border-secondary">
              <PhoneInput />
              <input
                id="numero"
                placeholder={flag.placeholder}
                className="w-full min-w-0 py-3 pl-3 pr-2 bg-transparent text-zinc-800 placeholder:text-gray-400 focus:outline-none"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Por favor ingresa tu número telefónico.",
                  },
                  maxLength: {
                    value: parseInt(flag.length),
                    message: "El número excede el largo permitido.",
                  },
                  minLength: {
                    value: parseInt(flag.length),
                    message: "El número debe contener 11 caracteres.",
                  },
                  pattern: {
                    value: flag.regex,
                    message: "El número ingresado no es válido.",
                  },
                })}
              />
            </div>
            {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="correo">
              Correo electrónico
            </label>
            <div className="relative">
              <svg className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <input
                id="correo"
                placeholder="tu@correo.com"
                className={`${inputBase} pl-11`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Por favor ingresa tu correo electrónico.",
                  },
                  maxLength: {
                    value: 50,
                    message: "El correo no puede tener más de 50 caracteres.",
                  },
                  minLength: {
                    value: 2,
                    message: "El correo debe tener al menos 2 caracteres.",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El correo ingresado no es válido.",
                  },
                })}
              />
            </div>
            {errors.email && <p className={errCls}>{errors.email.message}</p>}
          </div>
        </div>

        <div className="flex flex-row items-center mb-3">
          <input
            type="checkbox"
            className="custom-check"
            id="terms-check"
            value="aggree"
            defaultChecked
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label
            className="ml-3 text-left text-sm text-gray-900"
            htmlFor="terms-check"
          >
            Acepto los términos y condiciones.
          </label>
        </div>

        <div id="registered-container" className="text-red-600 mb-2"></div>

        <button
          id="submit-btn"
          className="w-full bg-secondary text-white my-3 py-4 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center justify-center"
          type="submit"
          disabled={!termsAccepted || isLoading || showModal}
        >
          {isLoading && <CustomSpinner />}
          Suscribirme al Club
        </button>
      </form>
    </div>
  );
}
