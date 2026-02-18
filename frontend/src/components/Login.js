import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated, setId: setGlobalId } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                id,
                password
            });

            if (response.data.success) {
                setIsAuthenticated(true);
                setGlobalId(id);
                navigate('/dashboard');
            } else {
                setError('Invalid ID or Password');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] font-sans text-gray-800">
            <div className="flex items-center justify-center w-full h-full">
                <div className="bg-white p-10 rounded-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40 w-[350px] text-center animate-fadeIn relative">
                    <h2 className="mb-8 text-3xl tracking-[2px] text-gray-800 uppercase font-bold">LOGIN</h2>
                    {error && <p className="bg-[rgba(255,82,82,0.1)] text-[#d32f2f] p-2.5 rounded mb-5 text-sm border border-[rgba(255,82,82,0.2)]">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-5 text-left">
                            <label htmlFor="id" className="block mb-2 text-sm text-gray-600 font-medium">ID</label>
                            <input
                                type="text"
                                id="id"
                                placeholder="Enter your ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                                className="w-full p-3 bg-white/50 border border-black rounded-lg text-gray-800 text-base focus:outline-none focus:bg-white/80 focus:border-[#a6c1ee] focus:shadow-[0_0_10px_rgba(166,193,238,0.5)] transition-all duration-300 box-border"
                            />
                        </div>
                        <div className="mb-5 text-left">
                            <label htmlFor="password" className="block mb-2 text-sm text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-white/50 border border-black rounded-lg text-gray-800 text-base focus:outline-none focus:bg-white/80 focus:border-[#a6c1ee] focus:shadow-[0_0_10px_rgba(166,193,238,0.5)] transition-all duration-300 box-border"
                            />
                        </div>
                        <button type="submit" className="w-full p-3.5 bg-gradient-to-br from-[#1e90ff] to-[#0052cc] rounded-full text-white text-lg font-semibold mt-2.5 shadow hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.5)] active:translate-y-0 transition-all duration-200 cursor-pointer">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
