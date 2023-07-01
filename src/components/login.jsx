import React, { useState } from 'react';
import img from "../images/birdlogo.png";
import Signin from './Signin';
import { Container, Row, Col, FormGroup } from 'react-bootstrap';
import Signup from './Signup';

const Login = () => {
  const [showSignin, setShowSignin] = useState(true);
  const handleSigninClick = () => {
    setShowSignin(true);
  };
  const handleSignupClick = () => {
    setShowSignin(false);
  };
  return (
    <div className='loginpage'>
      <Container fluid className='loginpage1'>
        <Row>
          <Col xs="12" md="6" className='loginLeftlogo'>
            <img src={img} alt="" />
          </Col>
          <Col xs="12" md="6" className='loginright'>
            <div className='forminput'>
              <Row>
                <Col xs="6" md="6" className={`loginfn ${showSignin ? 'active' : 'disactive'}`}>
                  <h5 onClick={handleSigninClick}>Sign In</h5>
                </Col>
                <Col xs="6" md="6" className={`loginfn ${showSignin ? 'disactive' : 'active'}`}>
                  <h5 onClick={handleSignupClick}>Sign Up</h5>
                </Col>
              </Row>
              <div className='FormIn'>
                {showSignin ? <Signin /> : <Signup cancelprop={handleSigninClick} />}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;