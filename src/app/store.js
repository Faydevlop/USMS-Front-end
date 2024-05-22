import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage engine
import { combineReducers } from '@reduxjs/toolkit';


// Assuming authReducer is your slice
import { authReducer } from '../features/authSlice';
import { adminReducer } from '../features/adminSlice';


const rootReducer = combineReducers({
    auth:authReducer,
    AdminSlice:adminReducer
})

const persistConfig = {
    key:'root',
    storage,
    whitelist:['auth','AdminSlice'],

}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer:persistedReducer,
})


// Export both the store and the persistor
export const persistor = persistStore(store);
export default store;