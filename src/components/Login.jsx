import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password_digest, setPassword_digest] = useState('');
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword_digestChange = (e) => {
    setPassword_digest(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

   
    const loginData = {
      email,
      password_digest,
    };

    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          setEmail('');
          setPassword_digest('');
          setLoginStatus(true);
          navigate('/');
          return response.json();
        } else {
          console.log('Login failed');
          setLoginStatus(false);
          
        }
      })
      .then((user) => {
        
        onLogin(user);
      })
      .catch((error) => {
        console.log('Login error:', error);
       
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <p>Login</p>
          <form onSubmit={handleLogin}>
            <div className="user-box">
              
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
              />
            </div>
            <div className="user-box">
              
              <input
                type="password"
                value={password_digest}
                onChange={handlePassword_digestChange}
                placeholder="Password."
              />
            </div>
            <a href="#" onClick={handleLogin}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </a>
          </form>
          {loginStatus === true && (
            <p className="success-message">Login successful!</p>
          )}
          {loginStatus === false && (
            <p className="error-message">Invalid email or password</p>
          )}
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="a2">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
