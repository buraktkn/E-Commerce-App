import React from "react";
import { Box, Flex, Heading, Input, Button, Field } from "@chakra-ui/react";
import { PasswordInput } from "../../Components/ui/password-input";
import { useFormik } from "formik";
import validationSignIn from './validationSignIn'
import {fetchLogin} from '../../api'  
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";

export default function SignIn() {

  const navigate = useNavigate();
  const {login} = useAuth(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSignIn,
    onSubmit: async (values, bag) => {
      try{
        const loginData = await fetchLogin({email: values.email, password: values.password});
        login(loginData)
        navigate("/profile")
        console.log(loginData);
        
      }
      catch(e){
        bag.setErrors({general: e.response.data.message})
      }
    },
  });
  return (
    <div>
      <Flex align={"center"} width={"full"} justifyContent={"center"}>
        <Box pt={10}>
          <Box textAlign={"center"}>
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5} textAlign={"left"}>
            <form onSubmit={formik.handleSubmit}>
                
              <Field.Root required mt="4">
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Enter your email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email} 
                />
              </Field.Root>
              <Field.Root required mt="4">
                <Field.Label>
                  Password <Field.RequiredIndicator />
                </Field.Label>  
                <PasswordInput
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Field.Root>
              <Button mt="4" width="full" type="submit">Sign In</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}