"use client"
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e:any) => {
        e.preventDefault();

        const payload = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login, e.g., show a message or redirect
                console.log(data.message);
            } else {
                // Handle login failure
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error:', error);
        }
    };

    return (
        <section>
            <div>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    );
};

export default Login;
