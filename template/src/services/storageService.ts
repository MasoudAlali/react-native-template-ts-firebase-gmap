import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
    async getItem(key: string, defaultValue: any = null) {
        return JSON.parse(await AsyncStorage.getItem(key) || JSON.stringify(defaultValue));
    }

    async setItem(key: string, value: any) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    async removeItem(key: string) {
        return AsyncStorage.removeItem(key);
    }
}

export default new StorageService();
