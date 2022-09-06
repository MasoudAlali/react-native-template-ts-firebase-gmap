import { ShowModalParams } from "../components/ui/Modal";
import EventEmitter from "./eventEmitter";

class UiService {
	showModal(params: ShowModalParams) {
		EventEmitter.emit(EventEmitter.Events.General.ShowModal(), params);
	}

	hideModals() {
		EventEmitter.emit(EventEmitter.Events.General.HideModal());
	}
}

export default new UiService();
