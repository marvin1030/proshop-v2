import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserQuery, useEditUserMutation } from '../../slices/usersApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const EditUserScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading, error } = useGetUserQuery(userId);
    const [editUser, { isLoading: updateUserLoading, refetch }] = useEditUserMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await editUser({
                id: userId,
                name,
                email,
                isAdmin
            });
            toast.success('user is updated');
            // refetch();
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }

    };

    useEffect(() => {
        if (user) {
            console.log(user)
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])
    return (
        <>
            <Row>
                <Col md={9}> <h1>Edit User</h1></Col>
                <Col md={3}><LinkContainer to={'/admin/userlist'}><Button>Back</Button></LinkContainer></Col>

            </Row>

            {isLoading ? (<Loader />) : (
                <FormContainer>
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
                        <Form.Group controlId='isAdmin' className='my-3'>
                            <Form.Label>Admin Role</Form.Label>
                            <Form.Check
                                type='checkbox'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}> Update</Button>
                        {isLoading && <Loader />}
                    </Form>
                </FormContainer >)
            }

        </>
    )
}

export default EditUserScreen
