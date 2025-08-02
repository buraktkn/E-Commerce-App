import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postProduct } from '../../api';
import { Box, Button, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import validationSchema  from './validations';
import { Alert } from "@chakra-ui/react"


export default function NewProduct () {
    const queryClient = useQueryClient();
    const newProductMutatiton = useMutation({
        mutationFn:postProduct,
        onSuccess:()=>{queryClient.invalidateQueries(['admin:prodcuts']);}
    });
    const [showSucces, setShowSucces] = useState(false);
    const handleSubmit = async (values, bag) => {
        console.log(values);    
        const newValues = {
            ...values, photos:JSON.stringify(values.photos)
        }
        newProductMutatiton.mutate(newValues, {
            onSuccess:()=> {setShowSucces(true)}
        })
    };
    
  return (
    <div>
        <Text fontSize={'2xl'}>New product</Text>
        {showSucces && (
            <Alert.Root status="info" title="This is the alert title">
                <Alert.Indicator />
                <Alert.Title>Product is added successfully</Alert.Title>
            </Alert.Root>
        )}
        <Formik 
        initialValues={{title: '', description : '', price: '', photos :[]}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {
            ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => 
                <>
                    <Box>
                        <Box my='5' textAlign={'left'}>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} disabled={isSubmitting} width={'3xl'}/>
                                    {touched.title && errors.title && <Text color={'red'}>{errors.title}</Text>}
                                </FormControl>
                                <FormControl mt='40'>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} disabled={isSubmitting} width={'3xl'}/>
                                    {touched.description && errors.description && <Text color={'red'}>{errors.description}</Text>}
                                </FormControl>
                                <FormControl mt='40'>
                                    <FormLabel>Price</FormLabel>
                                    <Input name='price' onChange={handleChange} onBlur={handleBlur} value={values.price} disabled={isSubmitting} width={'3xl'}/>
                                    {touched.price && errors.price && <Text color={'red'}>{errors.price}</Text>}
                                </FormControl>
                                <FormControl mt='40'>
                                    <FormLabel>Photos</FormLabel>
                                    <FieldArray name='photos' render={(arrayHelpers)=>(
                                        <div>
                                            {values.photos && values.photos.map((photo, index)=>(
                                              <div key={index}>
                                                <Input name={`photos.${index}`} value={photo} disabled={isSubmitting} onChange={handleChange} width={'3xl'}/>
                                                <Button ml='4' type='button' color={'white'} colorPalette={'orange'} 
                                                onClick={()=> arrayHelpers.remove(index)}
                                                >Remove</Button>
                                              </div>  
                                            ))}
                                            <Button mt={'5'} color={'white'} onClick={()=>arrayHelpers.push('')}>Add a Photo</Button>
                                        </div>
                                    )} onChange={handleChange} onBlur={handleBlur} value={values.photos} disabled={isSubmitting} />
                                </FormControl>
                                <Button mt={'4'} width={'3/6'} type='submit' isLoading={isSubmitting} color={'white'} colorPalette={'cyan'} >
                                    Save Product
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </>
            }
        </Formik>
    </div>
  )
}
