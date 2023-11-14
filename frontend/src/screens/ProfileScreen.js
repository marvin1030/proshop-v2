import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';



const ProfileScreen = () => {
    const dispatch = useDispatch();

    const { data: orders, isLoading: isLoadingOrders, error: ordersError } = useGetMyOrdersQuery()

    const { userInfo } = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateProfile, { isLoading, error }] = useUpdateProfileMutation(userInfo.id);

    useEffect(() => {
        if (userInfo) {

            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.email, userInfo.name])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match')
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
            } catch (err) {
                toast.error(err?.data?.message || err?.error)
            }
        }
    }
    return (
        <>
            <Row>
                <Col md={5}>
                    <FormContainer>
                        <h1>Profile</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={name}
                                    placeholder='Enter name'
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email' className='my-3'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    placeholder='Enter email'
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password' className='my-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    placeholder='Enter password'
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='confirmPassword' className='my-3'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={confirmPassword}
                                    placeholder='Confirm password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary' className='mt-2'> Update Profile</Button>
                            {/* {isLoading && <Loader />} */}
                        </Form>

                    </FormContainer>
                </Col>
                <Col md={9}>
                    <h2>Orders</h2>
                    {isLoadingOrders ? (<Loader></Loader>) : ordersError ? (<Message variant={'danger'}>{ordersError?.data?.message || ordersError.error}</Message>) :
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
                                    <tr>
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
            </Row>
        </>
    )
}

export default ProfileScreen;

