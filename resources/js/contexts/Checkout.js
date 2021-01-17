import { createContext } from "react";

const CheckoutContext = createContext({
    items: {},
    addItem: () => {},
});

export default CheckoutContext;
