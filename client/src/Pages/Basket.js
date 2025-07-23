import { Link } from "react-router";
import { useBasket } from "../Contexts/BasketContext";
import React from "react";
import { Box, Button, Image } from "@chakra-ui/react";

export default function Basket() {
  const { basketItems, removeFromBasket } = useBasket();
  console.log("price", basketItems);
  const total = basketItems.reduce((acc, obj)=> acc + obj.price, 0) 


  return (
    <Box p={5}>
      {basketItems.length < 1 && <p>Your basket is empty</p>}

      {basketItems.length > 0 && <>
        <ul >
        {
            basketItems.map((item) => (
                  <li key={item._id}>
                    <Link to={`/product/${item._id}`}>
                        {item.title} - {item.price} TL
                        <Image src={item.photos[0]} htmlWidth={200}/>
                    </Link>
                    <Button m="4" size={"sm"} colorPalette="red" onClick={()=>removeFromBasket(item._id)} >Remove From Basket</Button>
                  </li>
            ))
        }
        </ul>
        <br></br>
      <Box mt={10}>Total : {total} TL </Box>  
      </>}
      
    </Box>
  );
}
