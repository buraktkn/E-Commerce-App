import { Link } from "react-router-dom";
import { useBasket } from "../Contexts/BasketContext";
import { Box, Button, Image } from "@chakra-ui/react";
import { Dialog, Field, Textarea, Portal, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { postOrder } from "../api";

export default function Basket() {
  const { basketItems, removeFromBasket, emptyBasket } = useBasket();
  //console.log("price", basketItems);
  const total = basketItems.reduce((acc, obj) => acc + obj.price, 0);
  const ref = useRef();
  const [address, setAddress] = useState('');
  //console.log(address);
  const handleSubmitForm = async ()=> {
    const basketItemIds = basketItems.map((item) => item._id);
    const input = { address, items : JSON.stringify(basketItemIds)}
    const response = await postOrder(input)
    console.log(response);
    emptyBasket();
  }

  return (
    <Box p={5}>
      {basketItems.length < 1 && <p>Your basket is empty</p>}
      {basketItems.length > 0 && (<>
          <ul>
            {basketItems.map((item) => (
              <li key={item._id}>
                <Link to={`/product/${item._id}`}>
                  {item.title} - {item.price} TL
                  <Image src={item.photos[0]} htmlWidth={200} />
                </Link>
                <Button
                  m="4"
                  size={"sm"}
                  colorPalette="red"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove From Basket
                </Button>
              </li>
            ))}
          </ul>
          <br></br>
          <Box mt={10}>Total : {total} TL</Box>
          <Dialog.Root initialFocusEl={() => ref.current}>
            <Dialog.Trigger asChild>
              <Button mt={"2"} colorPalette={"green"}>Order Basket</Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header m={3}>
                    <Dialog.Title>Order </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                    <Stack gap="4">
                      <Field.Root m={3}>
                        <Field.Label>Address</Field.Label>
                        <Textarea width={80} mt={4} placeholder="Address" value={address} 
                        onChange={(e)=> setAddress(e.target.value)}/>
                      </Field.Root>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer m={4}>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" colorPalette={'red'}>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button colorPalette={'green'} onClick={handleSubmitForm}>Save</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </>
      )}
    </Box>
  );
}
