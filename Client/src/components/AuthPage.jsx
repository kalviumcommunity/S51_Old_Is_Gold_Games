import React, { useState } from 'react';
// import './LoginSignUpPage.css'; // Importing the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginSignUpPage() {
  const [loginMode, setLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    axios.post('https://retrogames2024-uqzk.onrender.com/login', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        document.cookie = `token=${response.data.token}; path=/`
        setError("")
        navigate('/home')
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError(error.response.data.message)
      });
  };
  

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios.post('https://retrogames2024-uqzk.onrender.com/signup', { username, password })
      .then(response => {
        console.log('signup successful:', response.data);
        document.cookie = `token=${response.data.token}; path=/`
        setError("")
        navigate('/home')
      })
      .catch(error => {
        console.error('signup failed:', error.response.data);
        setError(error.response.data.message)
      });
    console.log('Sign up submitted:', { username, password });
  };

  const toggleMode = () => {
    setLoginMode(!loginMode);
  };

  const guest = () =>{
    document.cookie = "token" + '=; Max-Age=-99999999;'
    navigate('/home')
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {loginMode ? (
                <div>
                  <h3 className="mb-4">Login</h3>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <label htmlFor="loginUsername">Username</label>
                      <input type="text" className="form-control" id="loginUsername" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <input type="password" className="form-control" id="loginPassword" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                  <p className="mt-3">Don't have an account? <button className="btn btn-link p-0" onClick={toggleMode}>Sign Up</button></p>
                </div>
              ) : (
                <div>
                  <h3 className="mb-4">Sign Up</h3>
                  <form onSubmit={handleSignupSubmit}>
                    <div className="form-group">
                      <label htmlFor="signupUsername">Username</label>
                      <input type="text" className="form-control" id="signupUsername" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="signupPassword">Password</label>
                      <input type="password" className="form-control" id="signupPassword" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                  <p className="mt-3">Already have an account? <button className="btn btn-link p-0" onClick={toggleMode}>Login</button></p>
                </div>
              )}


              <h3>---OR---</h3>
              <button onClick={()=>{guest()}}>Guest</button>

              {error && <div>{error}</div>} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
