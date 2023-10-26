export const addDecibals = (amt) => {
    return Math.round(amt * 100).toFixed(2) / 100;
}

export const updateCart = (state) => {

    // number of items
    state.numberOfItems = state.cartItems.reduce((accum, item) => {
        return accum + item.qty;
    }, 0);

    // calculate price of items in cart
    state.itemsPrice = state.cartItems.reduce((accum, item) => {
        return addDecibals(accum + item.price * item.qty);
    }, 0);

    // calculate shipping $0 for over $100 or $10
    state.shippingPrice = addDecibals(state.itemsPrice > 100 ? 0 : 10);

    //calculate tax (15%)
    state.taxes = addDecibals(state.itemsPrice * .15)

    // get cart total
    state.cartTotal = addDecibals(state.itemsPrice + state.shippingPrice + state.taxes)

    // save state to local storage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;

}