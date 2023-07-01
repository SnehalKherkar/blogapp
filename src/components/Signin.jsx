import React, { useCallback, useEffect, useState } from 'react'
import { Container, Row, Col, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import { userLogin } from '../redux/createSlice/authlogin';
import { toast } from 'react-toastify';
const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    const dispatch = useDispatch();
    const submitLoginForm =  (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                toast.error("Password does not match!")
            } else {
                dispatch(userLogin({ username: username, password: confirmPassword }));
                toast.success("Login Successfully!")
            }
        }
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div>
            <form onSubmit={submitLoginForm}>
                <FormGroup floating>
                    <Label for="username" className='labels'>
                        Username
                    </Label>
                    <Input
                        id="username"
                        className='inputfield'
                        name="username"
                        placeholder="Username"
                        type="text"
                        style={{ width: "100%" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup floating>
                    <Label for="examplePassword" className='labels'>
                        Password
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"
                        className='inputfield'
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup floating>
                    <Label for="examplePassword" className='labels'>
                        Confirm Password
                    </Label>
                    <Input
                        id="examplePassword1"
                        name="cpassword"
                        className='inputfield'
                        placeholder="Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <p>Forgot Password ?</p>
                <br />
                <button type='submit'>SIGN IN</button>
            </form>
        </div>
    )
}
export default Signin;