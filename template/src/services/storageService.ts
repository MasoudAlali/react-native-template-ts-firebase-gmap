import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
	async get(key: string, defaultValue: any = null) {
		return JSON.parse(await AsyncStorage.getItem(key) || JSON.stringify(defaultValue));
	}

	set(key: string, value: any) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	}

	remove(key: string) {
		return AsyncStorage.removeItem(key);
	}
}

export default new StorageService();
