import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8081/api/users/${id}`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div>
            <h2 className={"titulo"}>Lista de Usuarios</h2>
            <Link to="/add-user" className="btn btn-primary mb-2">Add User</Link>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                            <Link to={`/edit-user/${user.id}`} className="btn btn-info">Edit</Link>
                            <button onClick={() => deleteUser(user.id)} className="btn btn-danger ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
