import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import Sample from './components/Sample';
import Form from './components/Form';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="font-sans text-gray-800">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />

                        {/* Standalone Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/sample"
                            element={
                                <PrivateRoute>
                                    <Sample />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/form"
                            element={
                                <PrivateRoute>
                                    <Form />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
