import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const products = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), 
  endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: () => ({
            url: 'products',
            method: 'GET',  
          }),
      }),
    getProduct: builder.query({
      query: (productId: string) => ({
          url: `products/${productId}`,
          method: 'GET',  
        }),
    }),
  }),
});

export const { useGetAllProductsQuery, useLazyGetProductQuery } = products;