import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const users = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/users/' }), 
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
        query: (body) => ({
          url: 'login',
          method: 'POST',
          body,
        }),
      }),
  }),
});

export const { useSignupMutation, useLoginMutation } = users;