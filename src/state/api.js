import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

/* ================= RAW BASE QUERY ================= */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState()?.auth?.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

/* ================= BASE QUERY WITH REAUTH ================= */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = api.getState()?.auth?.refreshToken;

    if (!refreshToken) {
      api.dispatch({ type: "auth/logout" });
      return result;
    }

    // 🔁 Refresh JWT
    const refreshResult = await rawBaseQuery(
      {
        url: "/api/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      api.dispatch({
        type: "auth/setCredentials",
        payload: refreshResult.data,
      });

      // 🔁 Retry original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

/* ================= API ================= */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Products",
    "Product",
    "User",
    "Wishlist",
    "Orders",
    "Order",
    "Cart",
    "Customers",
  ],

  endpoints: (builder) => ({
    /* ================= AUTH ================= */

    // 🔥 Firebase → Backend bridge (ONLY AUTH API)
    firebaseLogin: builder.mutation({
      query: (idToken) => ({
        url: "/api/auth/firebase",
        method: "POST",
        body: { idToken },
      }),
    }),

    logoutAllDevices: builder.mutation({
      query: () => ({
        url: "/api/auth/logout-all",
        method: "POST",
      }),
    }),

    /* ================= PRODUCTS ================= */
    getProducts: builder.query({
      query: ({ category, search } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        return `/api/products${params.toString() ? `?${params}` : ""}`;
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (r, e, id) => [{ type: "Product", id }],
    }),

    /* ================= USER ================= */
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

    /* ================= CART ================= */
    getCart: builder.query({
      query: () => "/api/users/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (productId) => ({
        url: "/api/users/cart",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQty: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/api/users/cart/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/api/users/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    /* ================= ORDERS ================= */
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/api/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    createRazorpayOrder: builder.mutation({
      query: (body) => ({
        url: "/api/orders/razorpay",
        method: "POST",
        body,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (body) => ({
        url: "/api/orders/verify-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    createShipment: builder.mutation({
      query: (body) => ({
        url: "/api/orders/shiprocket",
        method: "POST",
        body,
      }),
    }),

    getMyOrders: builder.query({
      query: () => "/api/orders/myorders",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (r, e, id) => [{ type: "Order", id }],
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    downloadInvoice: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}/invoice`,
        responseHandler: (res) => res.blob(),
      }),
    }),

    /* ================= ADMIN ================= */
    getCustomers: builder.query({
      query: () => "/client/customers",
      providesTags: ["Customers"],
    }),
  }),
});

/* ================= EXPORT HOOKS ================= */
export const {
  // AUTH
  useFirebaseLoginMutation,
  useLogoutAllDevicesMutation,

  // PRODUCTS
  useGetProductsQuery,
  useGetProductByIdQuery,

  // USER
  useGetProfileQuery,
  useToggleWishlistMutation,
  useGetWishlistQuery,

  // CART
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQtyMutation,
  useRemoveFromCartMutation,

  // ORDERS
  useCreateOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
  useCreateShipmentMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useLazyDownloadInvoiceQuery,

  // ADMIN
  useGetCustomersQuery,
} = api;
