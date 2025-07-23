import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

const BasketProvider =({children}) => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (data, findBasketItem) => {
        if(!findBasketItem){
            return setBasketItems((basketItems)=> [data, ...basketItems])
        }
        const filtered = basketItems.filter((item)=> item._id !== findBasketItem._id)
        setBasketItems(filtered);
    }

    const removeFromBasket = (item_id) => {
        const filtered = basketItems.filter((item)=>item._id !== item_id)
        setBasketItems(filtered)
    }

    const values = {basketItems, setBasketItems, addToBasket, removeFromBasket};
    return (
        <BasketContext.Provider value={values}> {children} </BasketContext.Provider>
    );
};

const useBasket = ()=>useContext(BasketContext);

export {BasketProvider, useBasket};