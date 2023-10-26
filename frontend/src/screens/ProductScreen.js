import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductsByIdQuery } from "../slices/productsApiSlice";
import Message from "../components/Message.js";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useGetProductsByIdQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }

    return (
        <>
            {isLoading ? <Loader /> : error ? <Message variant={'danger'}>
                {error?.data.message || error.error}
            </Message> : (
                <>
                    <Link className="btn btn-light my-3" to={'/'}> Go Back</Link>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3> {product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    ></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{product.countInStock ? 'In Stock' : 'Out Of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => {
                                                            return (<option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>)
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    disabled={product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>)}
        </>

    );
};

export default ProductScreen;
