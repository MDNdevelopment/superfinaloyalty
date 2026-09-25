export default function detectPlatform() {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const ua = navigator.userAgent || "";

  if (/android/i.test(ua)) {
    return "android";
  }

  const isIOSUserAgent = /iphone|ipad|ipod/i.test(ua);
  // iPadOS 13+ reports itself as "MacIntel" but exposes touch support.
  const isIPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  if (isIOSUserAgent || isIPadOS) {
    return "ios";
  }

  return "unknown";
}
