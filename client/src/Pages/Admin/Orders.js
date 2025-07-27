import { Table, Text } from '@chakra-ui/react'
import { fetchOrders } from '../../api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Orders () {

  const {isLoading, isError, data, error} = useQuery({queryKey: ['admin:orders'], queryFn: fetchOrders})
  if (isLoading) {
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error {error.message}</div>
  }
  console.log("Data",data);
  //console.log("Index",data[0].user);
  

  return (
    <div> 
      <Text fontSize={'2xl'} p={5}>Orders</Text>
      <Table.Root size="sm" width={80} p={10} m={5} striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Address</Table.ColumnHeader>
          <Table.ColumnHeader>Product Number</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">User</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.adress}</Table.Cell>
            <Table.Cell>{item.items.length}</Table.Cell>
            <Table.Cell textAlign="end">{item.user?.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </div>
  )
} 
 