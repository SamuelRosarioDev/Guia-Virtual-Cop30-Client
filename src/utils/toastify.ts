import { toast, type ToastOptions, type Id } from "react-toastify";

const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const showSuccess = (message: string) => {
    toast.success(message, defaultOptions);
};

export const showError = (message: string) => {
    toast.error(message, defaultOptions);
};

export const showInfo = (message: string) => {
    toast.info(message, defaultOptions);
};

export const showWarning = (message: string) => {
    toast.warn(message, defaultOptions);
};

// ✅ Novo: showLoading
export const showLoading = (message = "Carregando...") => {
    return toast.loading(message, {
        position: "top-right",
        closeOnClick: false,
        closeButton: false,
        draggable: false,
    });
};


// ✅ Novo: update para sucesso ou erro
export const updateToast = (toastId: Id, message: string, type: "success" | "error" | "info" | "warning") => {
    toast.update(toastId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
    });
};
