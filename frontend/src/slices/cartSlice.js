import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils.js'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

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
                    // if (x._id === itemExist._id) {
                    //     const updatedQty = x.qty + item.qty;
                    //     x.qty = updatedQty;
                    // }
                    return x._id === itemExist._id ? item : x;
                    // return x;

                })
            } else {
                state.cartItems = [
                    ...state.cartItems, item
                ]
            }
            return updateCart(state);
        }
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
