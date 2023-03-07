import { safeEncodeTo64 } from "@utils";
import axios, { AxiosResponse } from "axios";
import { judge0Instance } from "./axiosLib/axiosInstance";

type propsSubmit = {
  code: string;
  customInput?: string;
  languageID: number;
};
/** Submit the actual code */
export function postCode({
  languageID,
  code,
  customInput,
}: propsSubmit): Promise<AxiosResponse<any, any>> {
  const formData = {
    language_id: languageID,
    source_code: safeEncodeTo64(code),
    stdin: customInput ? safeEncodeTo64(customInput) : "",
  };

  return judge0Instance.post("/submissions", {
    params: { base64_encoded: "true", fields: "*" },
    data: formData,
  });
}

/** Check status of compilation */
export function getStatus(token: string) {
  return judge0Instance.get("/submissions/" + token, {
    params: { base64_encoded: "true", fields: "*" },
  });
}
