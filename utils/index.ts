export function safeEncodeTo64(str:string) {
    return Buffer.from(str).toString("base64");
}