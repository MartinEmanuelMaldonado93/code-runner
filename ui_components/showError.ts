import { toast } from "react-toastify";

export const showErrorToast = (msg?: string) => {
  toast.error(msg || "Something went wrong! Please try again.", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
