import { useBasket } from "../Contexts/BasketContext";
import React from "react";

export default function Basket() {
  const { basketItems } = useBasket();
  console.log("price", basketItems);

  return (
    <div>
      {basketItems.length < 1 && <p>Your basket is empty</p>}

      {basketItems.length > 0 &&
        basketItems.map((item, index) => (
          <ul key={index}>
            <li>Product Name: {item.title}</li>
            <li>Product Price: {item.price}₺</li>
            <li>
              <small>{item.description}</small>
            </li>
          </ul>
        ))}
    </div>
  );
}
