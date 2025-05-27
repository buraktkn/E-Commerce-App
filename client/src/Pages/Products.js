import { Grid, Box, Button, Flex } from "@chakra-ui/react";
import Card from "../Components/Card";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Products() {
    const fetchProducts = async ({pageParam = 0}) => {
        const res = await fetch(`http://localhost:4000/product?page=${pageParam}`);
        if (!res.ok) {throw new Error(`HTTP error! status: ${res.status}`);}
        return res.json();
        
      };
      const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
        } = useInfiniteQuery({
        queryKey: ["product"],
        queryFn: fetchProducts,
        initialPageParam: 0,
        getNextPageParam: (lastGroup, allGroups) => {
            const morePagesExits = lastGroup?.length === 12
            if(!morePagesExits){return}
            return allGroups.length + 1;
        }
      });
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>An error has occured: {error.message}</div>;
      console.log("Data",data);
      

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap="5"> 
        {   data.pages.map((group,i)=>(
                <React.Fragment key={i}>
                    {group.map(item => (
                        <Box w="100%" key={item._id}><Card item={item}/></Box>
                    ))}
                </React.Fragment>
        ))}
      </Grid>
      <Flex justifyContent={"center"} m={10}>
        <Button 
          onClick={() => fetchNextPage()}
          isLoading={true}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </Flex >
    </div>
  );
}
