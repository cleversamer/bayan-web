/* eslint-disable import/no-anonymous-default-export */
import { toast } from "react-toastify";

const toastConfig = {
  position: toast.POSITION.TOP_RIGHT,
  bodyStyle: { textAlign: "right" },
};

export const showError = (mssg) => {
  toast.error(mssg, toastConfig);
};

export const showSuccess = (mssg) => {
  toast.success(mssg, toastConfig);
};

export const showWarning = (mssg) => {
  toast.warn(mssg, toastConfig);
};

export default {
  showError,
  showSuccess,
  showWarning,
};
