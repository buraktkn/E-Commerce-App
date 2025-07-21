import React from "react";
import { Box, Flex, Heading, Input, Button, Field, Alert } from "@chakra-ui/react";
import { PasswordInput } from "../../Components/ui/password-input";
import { useFormik } from "formik";
import validationSchema from './validation'
import {fetchRegister} from '../../api'
import { useAuth } from "../../Contexts/AuthContext";

export default function SignUp() {

    const {login} = useAuth(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try{
        const registerData = await fetchRegister({email: values.email, password: values.password});
        login(registerData)
        console.log(registerData) 
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
            <Heading>Sign Up</Heading>
          </Box>
          <Box>
            {formik.errors.general && (
                <Alert.Root status="error" mt={4} p={4}>
                    <Alert.Indicator /><Alert.Title>{formik.errors.general}</Alert.Title>
                </Alert.Root>
            )}
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
              <Field.Root required mt="4">
                <Field.Label>
                  Password Confirm
                  <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  name="passwordConfirm"
                  placeholder="Confirm Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />
              </Field.Root>
              <Button mt="4" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}