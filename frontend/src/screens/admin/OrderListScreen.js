import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery, useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { Table, Row, Button, Col, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaTimes } from 'react-icons/fa';
const OrderListScreen = () => {

    const { data: orders, isLoading, error } = useGetOrdersQuery();
    const [deliverOrder, { refetch, isLoading: deliverOrderLoading, error: deliverOrderError }] = useDeliverOrderMutation();
    const updateShipping = async (orderId) => {
        console.log(orderId)
        try {
            await deliverOrder(orderId);
            refetch();
        } catch (error) {

        }

    }
    return (
        <>
            <h1> Orders</h1>
            <Row>
                <Col md={12}>
                    {isLoading ? (<Loader></Loader>) : error ? (<Message variant={'danger'}>{error?.data?.message || error.error}</Message>) :
                        (<Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Details</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? ('Yes') : <FaTimes color='red' />}</td>
                                        <td>{order.isDelivered ? ('Yes') : <FaTimes color='red' />}</td>
                                        <td><LinkContainer to={`/order/${order._id}`}>
                                            <Button>Details</Button>
                                        </LinkContainer></td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}

                </Col>
            </Row >
        </>
    )
}

export default OrderListScreen
