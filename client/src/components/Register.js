import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import './style.css';

Axios.defaults.withCredentials = true;

function Register() {
    const[Username,setUsername] = useState('');
    const[Password,setPassword] = useState('');
    const[Name,setName] = useState('');
    const[Msusername,setMsusername] = useState('');
    const[Mspassword,setMspassword] = useState('');
    const[Msname,setMsname] = useState('');

    let navigate = useNavigate();

    const login = () => {
        // Cek username
        if(Username === '') {
            setMsusername('Isi username anda')

        }
        // Cek Password
        else if (Password === '') {
            setMspassword('Isi password anda')
            setMsusername('')

        }
        // Cek Nama
        else if (Name === '') {
            setMsname('Isi nama anda')
            setMspassword('')
        }
        else {
            // setMsname('')
            Axios.post("http://localhost:3001/register", {
                username: Username,
                password: Password,
                name: Name,
            }).then((response) => {
                console.log(response);
            });
            navigate('/');
        }
        
    };
    return ( 
        <>
        <div className="back container py-5">
            <h1 className='text-light'>Register</h1>
            <p className='text-muted'>
                Create your account
            </p>
            <hr />
            <div className="form-group">
                <label>Username</label>
                <input className='form-control' type="text" onChange={(e) => {setUsername(e.target.value) }} />
                <p className="text-danger">{Msusername}</p>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className='form-control' type="password" onChange={(e) => {setPassword(e.target.value) }} />
                <p className="text-danger">{Mspassword}</p>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input className='form-control' type="text" onChange={(e) => {setName(e.target.value) }} />
                <p className="text-danger">{Msname}</p>
            </div>
            <br />
            <div className="form-group">
                <button className="btn btn-primary" onClick={login}>Register</button>
            </div>
            <p className="text-muted">
                You have account ? please <Link to='/'>Login</Link>
            </p>
        </div>
        </>
     );
}

export default Register