import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}`,
                method: 'POST',
                body: { ...data }
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: 'GET'
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details }
            }),
            keepUnusedDataFor: 5
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5
        }),
        updateOrderToPaid: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/pay`,
                method: 'PUT',
                body: data
            }),
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useDeliverOrderMutation,
    useGetMyOrdersQuery,
    useGetOrdersQuery,

} = ordersApiSlice;