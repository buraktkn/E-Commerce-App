import { Grid } from "@chakra-ui/react";
import Card from "../Components/Card";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:4000/product");
        if (!res.ok) {throw new Error(`HTTP error! status: ${res.status}`);}
        return res.json();
      };
      const {data: products, isLoading, error} = useQuery({
        queryKey: ["product"],
        queryFn: fetchProducts,
      });
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>An error has occured: {error.message}</div>;

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap="5">
        {products.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </Grid>
    </div>
  );
}
