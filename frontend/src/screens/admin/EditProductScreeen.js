import React from 'react';
import FormContainer from '../../components/FormContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetProductsByIdQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const EditProductScreeen = () => {
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const { data, isLoading, error } = useGetProductsByIdQuery(productId);
    const [updateProduct, { refetch, data: updateProductData }] = useUpdateProductMutation();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (data) {
            console.log('use effect is ran')
            setName(data.name);
            setPrice(data.price);
            setBrand(data.brand);
            setImage(data.image);
            setCategory(data.category);
            setCountInStock(data.countInStock);
            setDescription(data.description);
        }
    }, [data]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                _id: productId,
                name,
                price,
                brand,
                image,
                category,
                countInStock,
                description
            });
            toast.success('Product updated');
            // refetch(); breaking things
            navigate('/admin/productlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <LinkContainer to={'/admin/productlist'}><Button>Go Back</Button></LinkContainer>
            <FormContainer>
                <h1>Edit Product </h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            placeholder='Enter Name'
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price' className='my-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            value={price}
                            placeholder='Enter Price'
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand' className='my-3'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            value={brand}
                            placeholder='Enter Brand'
                            onChange={(e) => setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image' className='my-3'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            value={image}
                            placeholder='Image'
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category' className='my-3'>
                        <Form.Label>Categroy</Form.Label>
                        <Form.Control
                            type='text'
                            value={category}
                            placeholder='Category'
                            onChange={(e) => setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock' className='my-3'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type='text'
                            value={countInStock}
                            placeholder='Count in Stock'
                            onChange={(e) => setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className='my-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            value={description}
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}> Update</Button>
                    {isLoading && <Loader />}
                </Form>

            </FormContainer>
        </>
    )
}

export default EditProductScreeen
