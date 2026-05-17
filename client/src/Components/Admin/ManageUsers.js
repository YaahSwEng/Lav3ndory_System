import { useEffect } from "react";

import { Container, Table, Button } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { getUsers, deleteUser } from "../../Features/UserSlice";


const ManageUsers = () => {

    const dispatch = useDispatch();

    const usersList = useSelector((state) => state.users.usersList);

    useEffect(() => {

        dispatch(getUsers());

    }, [dispatch]);

    const handleDeleteUser = async (email) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this user?"

        );

        if (!confirmDelete) {

            return;

        }

        await dispatch(deleteUser(email));

        alert("User Deleted Successfully.");

    };

    return (
        <Container fluid className="manage-users-page">
            <div className="manage-users-card">
                <h1 className="manage-users-title">Manage Users</h1>
                <p className="manage-users-subtitle">

                    View and manage registered Lavendory users.
                </p>
                <Table responsive className="manage-users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Age Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {usersList.map((user) => (
                            <tr key={user.email}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
                                <td>{user.ageCategory}</td>
                                <td>
                                    <Button

                                        className="user-delete-btn"

                                        onClick={() => handleDeleteUser(user.email)}
                                    >

                                        Delete
                                    </Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>

    );

};

export default ManageUsers;
