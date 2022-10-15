import {combineReducers} from "redux";
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
import {configureStore} from "@reduxjs/toolkit";
import user from "./user";
import StorageService from "~/services/storageService";

const reducers = combineReducers({
    user,
});

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: StorageService,
    blacklist: [],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        });
    }
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>

export {store, persistor};
