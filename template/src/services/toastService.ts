import SimpleToast from "react-native-simple-toast";

type ToastTypes = "error" | "success" | "danger" | "info"
type ToastDurations = number;

class ToastService {
	showMessage(type: ToastTypes = "info", message: string, duration: ToastDurations = SimpleToast.SHORT) {
		SimpleToast.show(message, duration);
	}
}

export default new ToastService();
