import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils.js'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal'
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        deleteFromCart: (state, action) => {
            const item = action.payload;

            state.cartItems = state.cartItems.filter(x => {
                return x._id !== item._id
            });
            updateCart(state);
        },
        addToCart: (state, action) => {
            const item = action.payload
            // determine if item is in cart
            const itemExist = state.cartItems.find(x => {
                return x._id === item._id
            });
            // if item exist then override it, or add it
            if (itemExist) {
                state.cartItems = state.cartItems.map(x => {
                    return x._id === itemExist._id ? item : x;
                })
            } else {
                state.cartItems = [
                    ...state.cartItems, item
                ]
            }
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
});

export const { addToCart, deleteFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
