import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/firebase/firebase";

/* ================= BASE QUERY (FIREBASE) ================= */
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;

    if (user) {
      // 🔥 Firebase auto-refreshes token internally
      const token = await user.getIdToken();
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
/* ================= API ================= */
export const api = createApi({
  reducerPath: "api",

  // ✅ Use Firebase baseQuery (NOT baseQueryWithReauth)
  baseQuery,

  tagTypes: [
    "Products",
    "Product",
    "Customers",
    "User",
    "Wishlist",
    "Orders",
    "Order",
    "Cart",
  ],

  endpoints: (builder) => ({
    /* ================= AUTH ================= */
    

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/api/auth/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/api/auth/change-password",
        method: "POST",
        body,
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

        const queryString = params.toString();

        return `/api/products/${queryString ? `?${queryString}` : ""}`;
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
  
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutAllDevicesMutation,

  useGetProductsQuery,
  useGetProductByIdQuery,

  useGetProfileQuery,
  useToggleWishlistMutation,
  useGetWishlistQuery,

  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQtyMutation,
  useRemoveFromCartMutation,

  useCreateOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
  useCreateShipmentMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useLazyDownloadInvoiceQuery,

  useGetCustomersQuery,
} = api;
