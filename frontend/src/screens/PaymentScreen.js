import { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice.js';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeOrder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            className='my-2'
                            type='radio'
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                            label='PayPal or CreditCard'
                            value={'PayPal'}
                            checked
                            id='PayPal'
                            name='paymentMethod'
                        >

                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
