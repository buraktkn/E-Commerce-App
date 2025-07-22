import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

const BasketProvider =({children}) => {
    const [basketItems, setBasketItems] = useState([]);

    const values = {basketItems, setBasketItems};
    return (
        <BasketContext.Provider value={values}> {children} </BasketContext.Provider>
    );
};

const useBasket = ()=>useContext(BasketContext);

export {BasketProvider, useBasket};