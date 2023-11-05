import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, Image, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, deleteFromCart } from '../slices/cartSlice.js'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems, itemsPrice, numberOfItems } = cart;

    const changeQtyInCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const handleDeleteProduct = (product) => {
        dispatch(deleteFromCart({ ...product }));
    }

    const handleCheckout = () => {
        navigate('/login?/redirect=/shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                        (<Message> Your cart is empty <Link to='/'>Go Back</Link></Message>)
                        :
                        (<ListGroup variant='flush'>
                            {cartItems.map(item => {
                                return (
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item._id}`}> {item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as={'select'}
                                                    value={item.qty}
                                                    onChange={(e) => changeQtyInCartHandler(item, Number(e.target.value))}>
                                                    {[...Array(item.countInStock).keys()].map(x => {
                                                        return (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </Col >
                                            <Col md={2}>
                                                <Button variant='light' type='button' id={item._id} onClick={() => handleDeleteProduct(item)}><FaTrash /></Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)
                            })}

                        </ListGroup>)
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>SubTotal:
                                ({numberOfItems}) items
                            </h2>
                            <h2>${itemsPrice}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='buttom'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={handleCheckout}
                            >Proceed to checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
        </Row>

    )
}

export default CartScreen;
