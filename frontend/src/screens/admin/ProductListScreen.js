import React from 'react';
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Button, Row, Col, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProductListScreen = () => {
    const navigate = useNavigate();
    const { data: products, isLoading, error } = useGetProductsQuery();
    const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            toast.success('Product deleted')
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    };
    const handleEdit = (productId) => {
        navigate(`/admin/product/${productId}/edit`)
    }
    const handleCreateProduct = async () => {
        try {
            await createProduct();
            toast.success('Product created')
            // refetch();
        } catch (error) {

        }

    }

    return (
        <>
            <Row>
                <Col md={10}><h1> Products</h1></Col>
                <Col md={2}><Button onClick={handleCreateProduct}>Create Product</Button></Col>
            </Row>

            <Row>
                <Col md={12}>
                    {isLoading ? (<Loader></Loader>) : error ? (<Message variant={'danger'}>{error?.data?.message || error.error}</Message>) :
                        (<Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td><FaEdit onClick={() => handleEdit(product._id)} /></td>
                                        <td><FaTrash onClick={() => handleDelete(product._id)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}

                </Col>
            </Row >
        </>
    )
}

export default ProductListScreen
