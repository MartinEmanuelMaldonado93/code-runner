export function safeEncodeTo64(str: string) {
  return Buffer.from(String(str)).toString("base64");
}
/** replace of `atob(str)` deprecated */
export function safeDeEncodeFrom64(str: string) {
  return Buffer.from(str, "base64").toString("utf-8");
}
