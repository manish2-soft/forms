import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import Sample from './components/Sample';
import Form from './components/Form';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="font-sans text-gray-800">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />

                        <Route element={<PrivateRoute><Sidebar /></PrivateRoute>}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/sample" element={<Sample />} />
                            <Route path="/form" element={<Form />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
