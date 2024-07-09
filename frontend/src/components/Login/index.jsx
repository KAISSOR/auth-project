import { useState } from 'react';
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import axios from "axios"

function Login() {

    const [data , setData] = useState({
        email: "",
        password: ""
    });
    const [error , setError] = useState("")

    const handleChange = ({ currentTarget: input}) => {
        setData({...data , [input.name]:input.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Make sure you have data collected from your form before sending the request
          if (!data) {
            throw new Error("Please fill out the form completely");
          }
      
          const url = "http://localhost:5000/api/auth";
          const response = await axios.post(url, data);  // Use response instead of destructuring for clarity
          localStorage.setItem("token", response.data);
          window.location = "/";
        } catch (error) {
          // Handle different error scenarios
          if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message); // Assuming error response has a message
          } else {
            setError("An unexpected error occurred. Please try again later.");  // Generic message for other errors
          }
        }
      };
      

    return (
    <div className={styles.login_container}>
        <div className={styles.login_form_container}>
            <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Login to your account</h1>

                <input 
                type="email" 
                placeholder='Email' 
                name = 'email'
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
                />

                <input 
                type="password" 
                placeholder='Password' 
                name = 'password'
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type='submit' className={styles.green_btn}> 
                    Sign In
                </button>
                </form>
            </div>
            <div className={styles.right}>
                <h1>New here ...!</h1>
                <Link to="/signup">
                <button type='button' className={styles.white_btn}>Sign up</button>
                </Link>


            </div>
        </div>
    </div>
    );
};
  
export default Login;
  