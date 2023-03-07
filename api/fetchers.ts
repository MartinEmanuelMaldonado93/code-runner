import { safeEncodeTo64 } from "@utils";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { judge0Instance } from "./axiosLib/axiosInstance";
import { routes } from "./routes";

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
  const data_code = {
    language_id: languageID,
    source_code: safeEncodeTo64(code),
    stdin: customInput ? safeEncodeTo64(customInput) : "",
  };

  return judge0Instance.post(routes.SUBMISSIONS, JSON.stringify(data_code));
}

/** Check status of compilation */
export function getStatus(token: string) {
  return judge0Instance.get(routes.SUBMISSIONS + token);
}
