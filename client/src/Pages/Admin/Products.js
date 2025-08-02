import { Flex, Text } from "@chakra-ui/react";
import { deleteProduct, fetchProductList } from "../../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Table, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";

export default function Products() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn:deleteProduct,
    onSuccess:() => queryClient.invalidateQueries(['admin:products'])
  });

  const columns = useMemo(()=>{
    return [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Description", dataIndex: "description", key: "description" },
      { title: "Price", dataIndex: "price", key: "price" },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you Sure"
              onConfirm={() => deleteMutation.mutate(record._id, {
                onSuccess: () => { console.log('succes') }
              })}
              onCancel={() => console.log("İptal Edildi")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="/silme-url" style={{marginLeft:20}}>Delete</a>
            </Popconfirm>
          </>
        ),
      },
    ]
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error, {error.message}</div>;
  }
  console.log("Products Page Data :", data);

  return (
    <div>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text fontSize={"2xl"} p={5}>
        Products
      </Text>
      <Link to={'/admin/products/new'}>
        <Button>New Product</Button>
      </Link>
      </Flex>
      <Table w={80} dataSource={data} columns={columns} rowKey={"_id"}></Table>
    </div>
  ); 
}