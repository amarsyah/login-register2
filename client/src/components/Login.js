import Axios  from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './style.css';


Axios.defaults.withCredentials = true;

function Login() {
    const[Username,setUsername] = useState('');
    const[Password,setPassword] = useState('');
    const[Status,setStatus] = useState('');
    let navigate = useNavigate();

    const login = () => {
        // Cek username
        if(Username === '') {
            setStatus('isi username anda');
        }
        // Cek Password
        else if (Password === '') {
            setStatus('isi password anda');
            setStatus('');
        } else {
            Axios.post("http://localhost:3001/",{
                username: Username,
                password: Password,
            }).then((response) => {
                if (response.data.message) {
                    setStatus(response.data.message);
                } else {
                    sessionStorage.setItem('token', response.data);
                    navigate('/dashboard');
                    console.log(Username ,Password)
                }
            });
        }
        }

    useState(() => {
        if (sessionStorage.getItem("token") === null) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [navigate]);
    return ( 
        <>
        <div className="container py-5">
            <div className="back">
                            <h1 className='text-light'>LOGIN</h1>
            <p className='text-muted'>
                Please Login to authenticate
            </p>
            <hr />
            <div className="form-group">
                <label>Username</label>
                <input className='form-control' type="text" onChange={(e) => {setUsername(e.target.value) }} />
                <p className="text-danger">{Status}</p>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className='form-control' type="password" onChange={(e) => {setPassword(e.target.value) }} />
                <p className="text-danger">{Status}</p>
            </div>
            <br />
            <div className="form-group">
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
            <p className="text-muted">
                Don't have account? please <Link to='/register'>Register</Link>
            </p>
         </div>
        </div>
        </>
     );
}

export default Login