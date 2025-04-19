import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviews = createApi({
  reducerPath: 'reviews',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), 
  endpoints: (builder) => ({
    addReview: builder.mutation({
        query: ({body, token}) => ({
          url: 'reviews',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        }),
      }),
      updateReview: builder.mutation({
        query: ({reviewId, body, token}) => ({
          url: `reviews/${reviewId}`,
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        }),
      }),
      deleteReview: builder.mutation({
        query: ({reviewId, token}) => ({
          url: `reviews/${reviewId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      }),
});

export const { useAddReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } = reviews;