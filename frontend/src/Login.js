
import React, { useEffect, useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Form, Button, Navbar, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Nav from './Nav';


const Login = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            history.push('/home')
        }
    },[])
    const onLogin=()=>{
        setLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push('/home')
            })
            .catch((e)=>alert(e.message))
            .finally(() => setLoading(false))
    }
    return(
    <>
    <Nav/>
        <Form className="p-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-left">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        
                    </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" onClick={onLogin}>
                {loading? 'Logging you in...': 'Login'}
            </Button>
        </Form>
    </>
    )

}
export default Login;