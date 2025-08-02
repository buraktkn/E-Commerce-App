import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct, updateProduct } from '../../api';
import { Box, Button, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import validationSchema  from './validations';
import { message } from 'antd';
import { Alert } from "@chakra-ui/react"


export default function ProductUpdate() {
    const { product_id } = useParams();
    const [showSucces, setShowSucces] = useState(false);
    console.log(product_id);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['admin:product', product_id],
        queryFn: () => fetchProduct(product_id),
        enabled: !!product_id
    });
    if (isLoading) {return <div>Loading...</div>}
    if(isError) {return <div>Error {error.message}</div>}
    console.log("Data",data); 
    
    const handleSubmit = async (values, bag)=> {
        console.log('Submitted');

        try{
            await updateProduct(values, product_id);
            setShowSucces(true)
        }
        catch(e){
        }
    }

  return (
    <div>
        <Text fontSize={'2xl'}>Edit product</Text>
        {showSucces && (
            <Alert.Root status="info" title="This is the alert title">
                <Alert.Indicator />
                <Alert.Title>Product is updated successfully</Alert.Title>
            </Alert.Root>
        )}
        <Formik 
        initialValues={{title: data.title, description : data.description, price: data.price, photos :data.photos}}
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
                                    Update
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
