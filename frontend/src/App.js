import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
