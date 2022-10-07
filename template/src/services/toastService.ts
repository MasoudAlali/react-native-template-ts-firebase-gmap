import SimpleToast from "react-native-simple-toast";

type ToastTypes = "error" | "success" | "danger" | "info"

class ToastService {
    showMessage(type: ToastTypes = "info", message: string, duration: number = SimpleToast.SHORT) {
        SimpleToast.show(message, duration);
    }
}

export default new ToastService();
