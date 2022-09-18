import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import collectionContractReducer from "./collectionContractSlice";
import accountReducer from "./accountSlice";

const persistConfig = {
    key: 'account',
    storage,
}
const account = persistReducer(persistConfig, accountReducer)
export function makeStore() {
    return configureStore({
        reducer: {
            collectionContract: collectionContractReducer,
            account: account
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
    >

export const persistor  = persistStore(store)