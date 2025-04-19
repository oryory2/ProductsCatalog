import { configureStore } from '@reduxjs/toolkit';
import { users } from './api/users';
import { products } from './api/products';
import { reviews } from './api/review';



export const store = configureStore({
    reducer: {
        [users.reducerPath]: users.reducer,
        [products.reducerPath]: products.reducer,
        [reviews.reducerPath]: reviews.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(users.middleware)
        .concat(products.middleware)
        .concat(reviews.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;