import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../uiComponents/Button';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Both username and password are required.');
    } else {
      setError('');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, { username, password });
      if(response.status === 200) {
            localStorage.setItem('token', response.data.token);
            navigate("/");
        }else {
            setError('Invalid username or password.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text='login' onClick={handleLogin}/>
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
