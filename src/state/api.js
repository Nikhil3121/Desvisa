import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL, // e.g. http://localhost:5000
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Products", "Product", "Customers", "User", "Wishlist"],

  endpoints: (builder) => ({
    /* ================= AUTH ================= */

    signupUser: builder.mutation({
      query: (body) => ({
        url: "/api/users/signup",
        method: "POST",
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        body,
      }),
    }),

    /* ================= PRODUCTS ================= */

    getProducts: builder.query({
      query: ({ category, search } = {}) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const queryString = params.toString();
        return `/api/products${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    /* ================= USERS ================= */

    getProfile: builder.query({
      query: () => "/api/users/profile",
      providesTags: ["User"],
    }),

    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/users/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getWishlist: builder.query({
      query: () => "/api/users/wishlist",
      providesTags: ["Wishlist"],
    }),

    /* ================= ADMIN / CLIENT ================= */

    getCustomers: builder.query({
      query: () => "/client/customers",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCustomersQuery,
  useGetProfileQuery,
  useToggleWishlistMutation,
  useGetWishlistQuery,
} = api;
