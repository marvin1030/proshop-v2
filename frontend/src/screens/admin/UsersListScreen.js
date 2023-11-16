import { useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UsersListScreen = () => {
    const navigate = useNavigate();

    const { data: users, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: deleteUserLoading, refetch }] = useDeleteUserMutation();

    const handleCreateUser = () => { };
    const handleEdit = (userId) => {
        navigate(`/admin/user/${userId}/edit`)
    };
    const handleDelete = async (userId) => {
        try {
            const res = await deleteUser(userId);

            if (res.error.status === 400) {
                toast.error(res?.error?.data?.message);
            } else {
                toast.success('Deleted user');
                refetch();
            }

        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    };

    return (
        <>
            <Row>
                <Col md={10}><h1> Users</h1></Col>
                <Col md={2}><Button onClick={handleCreateUser}>Create User</Button></Col>
            </Row>

            <Row>
                <Col md={12}>
                    {isLoading ? (<Loader></Loader>) : error ? (<Message variant={'danger'}>{error?.data?.message || error.error}</Message>) :
                        (<Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? 'Admin' : 'Non Admin'}</td>
                                        <td><FaEdit onClick={() => handleEdit(user._id)} /></td>
                                        <td><FaTrash onClick={() => handleDelete(user._id)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}

                </Col>
            </Row >
        </>
    )
}

export default UsersListScreen
