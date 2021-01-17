const checkoutItemsIndex = "checkoutItems";
export const getCheckoutItems = () => {
    return localStorage.getItem(checkoutItemsIndex)
        ? JSON.parse(localStorage.getItem(checkoutItemsIndex))
        : {};
};

export const setCheckoutItems = (newItems) => {
    return localStorage.setItem(checkoutItemsIndex, JSON.stringify(newItems));
};
