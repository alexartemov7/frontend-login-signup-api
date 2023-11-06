// SignUpForm.jsx
import React, { useState } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Define the user data
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Make a POST request to the signUp endpoint
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Parse the JSON returned by the server
      const data = await response.json();

      if (response.status === 201) {
        setMessage('User signed up successfully.');
        setEmail(''); // Clear the email
        setPassword(''); // Clear the password
      } else {
        throw new Error(data.message || 'Failed to sign up.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUpForm;
