import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Profile({ history }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <Flex align={"center"} width={"full"} justifyContent={"center"}>
        <Text fontSize="22">Profile</Text>
        <code>{JSON.stringify(user)}</code>
      </Flex>
      <Flex align={"center"} width={"full"} justifyContent={"center"}>
      <Button colorScheme={"red"} variant={"solid"} onClick={handleLogout}>
          Log Out
        </Button>
      </Flex>
    </div>
  );
}
