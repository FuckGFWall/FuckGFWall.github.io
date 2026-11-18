export function detectSupportedPlatform() {
  const source = [navigator.userAgentData?.platform, navigator.platform, navigator.userAgent]
    .join(" ").toLowerCase();
  if (source.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(source)) return "ios";
  // iPads can identify as Macs when browsing in desktop mode.
  if (source.includes("mac")) return navigator.maxTouchPoints > 1 ? "ios" : "macos";
  if (/windows|win32|win64/.test(source)) return "windows";
  return null;
}
