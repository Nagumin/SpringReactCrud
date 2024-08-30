import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8081/api/users/${id}`)
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:8081/api/users/${id}`, user)
                .then(() => navigate('/'))
                .catch(error => console.error('Error updating user:', error));
        } else {
            axios.post('http://localhost:8081/api/users', user)
                .then(() => navigate('/'))
                .catch(error => console.error('Error creating user:', error));
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={user.age} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default UserForm;
