import { ORDERS_URL } from "../constants";
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
            query: (data) => ({
                url: `${ORDERS_URL}`,
                method: 'GET',
                body: data
            }),
        }),
        getMyOrder: builder.query({
            query: (data) => ({
                url: `${ORDERS_URL}/mine`,
                method: 'GET',
                body: data
            }),
        }),
        getOrderById: builder.query({
            query: (data) => ({
                url: `${ORDERS_URL}/:id`,
                method: 'GET',
                body: data
            }),
        }),
        updateOrderToPaid: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/pay`,
                method: 'PUT',
                body: data
            }),
        }),
        updateOrderToDelivered: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/deliver`,
                method: 'PUT',
                body: data
            }),
        }),
    })
});

export const {
    useCreateOrderMutation,

} = ordersApiSlice;