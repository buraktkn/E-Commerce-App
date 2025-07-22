import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router';
import { Box, Button, Text } from '@chakra-ui/react';
import moment from 'moment/moment';
import ImageGalery from "react-image-gallery";
import { useBasket } from '../Contexts/BasketContext';

export default function ProductDetail() {

    const {product_id} = useParams();
    const { addToBasket, basketItems } = useBasket();

    const fetchProductDetail = async () => {
        const res = await fetch(`http://localhost:4000/product/${product_id}`);
        if (!res.ok) {throw new Error(`HTTP error! status: ${res.status}`);}
        return res.json();
      };
      const { data: product, isLoading, error} = useQuery({
        queryKey: ["product", product_id],
        queryFn: fetchProductDetail,
      });
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>An error has occured: {error.message}</div>;
      //console.log(product);
       
      const findBasketItem = basketItems.find((basketItem)=> basketItem._id === product_id)
      const images = product.photos.map(url => ({original:url}))
  return (
    <div>
        <Button colorPalette={findBasketItem ? 'red' : 'green'} onClick={()=> {addToBasket(product, findBasketItem)}}>
            {
              findBasketItem ? 'Remove to Basket' : "Add to Basket" 
            }
        </Button>
        <Text as="h2" fontSize="2xl">{product.title}</Text> 
        <Text>{moment(product.createdAt).format("DD/MM/YYYY")}</Text>
        <p>{product.description}</p>
        <Box margin={10}>
            <ImageGalery items={images}></ImageGalery>
        </Box>
    </div>
  )
}
