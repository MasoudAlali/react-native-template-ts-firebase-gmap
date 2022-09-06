import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PersistConfig,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import general from "./general";

const reducers = combineReducers({
	user,
	general
});

const persistConfig: PersistConfig<RootState> = {
	key: "root",
	storage: AsyncStorage,
	blacklist: [],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
			}
		});
	}
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export { store, persistor };
