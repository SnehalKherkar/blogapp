import React, { useCallback, useState } from 'react';
import { Container, Row, Col, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import { Registration } from '../redux/createSlice/userRegistration';

const Signup = ({ cancelprop }) => {
    const [Contact_no, setContact_no] = useState("");
    const [Email, setEmail] = useState("");
    const [ConfirmEmail, setConfirmEmail] = useState("");
    const [First_Name, setFirst_Name] = useState("");
    const [Middle_Name, setMiddle_Name] = useState("");
    const [Last_Name, setLast_Name] = useState("");
    const [Date_of_Birth, setDate_of_Birth] = useState("");
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profile_picture, setProfile_Picture] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const handleNext = useCallback(() => {
        setCurrentPage(currentPage + 1);
    },[currentPage])
    const handlePrevious = useCallback(() => {
        setCurrentPage(currentPage - 1);
    },[currentPage]);
    
    const submitform = (e) => {
        e.preventDefault();
        dispatch(Registration({ Email, Contact_no, First_Name, Middle_Name, Last_Name, Date_of_Birth, profile_picture, username, password })).then((res) => (res)).catch((err) => console.log(err))
    }

    const handleFileUpload = useCallback(async (e) => {
        const file = e.target.files[0];
        setProfile_Picture(file);
    },[profile_picture])


    return (
        <form onSubmit={submitform}>
            <div>
                {currentPage === 1 && (
                    <>
                        <FormGroup floating>
                            <Label for="mobileno" className='labels'>
                                Contact No
                            </Label>
                            <Input
                                id="mobileno"
                                className='inputfield'
                                name="mobileno"
                                placeholder="Enter Contact No"
                                type="text"
                                style={{ width: "100%" }}
                                value={Contact_no}
                                onChange={(e) => setContact_no(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup floating>
                            <Label for="email" className='labels'>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                className='inputfield'
                                placeholder="Enter Email"
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup floating>
                            <Label for="email" className='labels'>
                                Confirm Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                className='inputfield'
                                placeholder="Enter Email"
                                type="email"
                                value={ConfirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                            />
                        </FormGroup>
                    </>
                )}
                {currentPage === 2 && (

                    <>
                        <Label for="firstname" className='labels'>
                            Full Name
                        </Label>
                        <div style={{ display: "flex", width: "100%" }}>
                            <FormGroup floating>

                                <Input
                                    id="firstName"
                                    name="firstName"
                                    className='inputfield'
                                    placeholder="FirstName"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={First_Name}
                                    onChange={(e) => setFirst_Name(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup floating>

                                <Input
                                    id="middlename"
                                    name="middlename"
                                    className='inputfield'
                                    placeholder="Middle Name"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={Middle_Name}
                                    onChange={(e) => setMiddle_Name(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup floating>

                                <Input
                                    id="lastname"
                                    name="lastname"
                                    className='inputfield'
                                    placeholder="Last Name"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={Last_Name}
                                    onChange={(e) => setLast_Name(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup floating>
                            <Label for="dob" className='labels'>
                                Date of Birth
                            </Label>
                            <Input
                                id="dob"
                                className='inputfield'
                                name="dob"
                                placeholder="DD/MM/YYYY"
                                type="date"
                                style={{ width: "100%" }}
                                value={Date_of_Birth}
                                onChange={(e) => setDate_of_Birth(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup floating>
                            <Label for="profile" className='labels'>
                                Upload Profile Photo
                            </Label>
                            <Input
                                id="profile"
                                className='inputfield'
                                name="profile"
                                placeholder="Upload Profile Photo"
                                type="file"
                                style={{ width: "100%" }}
                                accept='.jpeg, .png ,.jpg'
                                onChange={(e) => handleFileUpload(e)}
                            />
                        </FormGroup>
                    </>
                )}
                {currentPage === 3 && (
                    <>
                        <FormGroup floating>
                            <Label for="username" className='labels'>
                                Set Username
                            </Label>
                            <Input
                                id="username"
                                className='inputfield'
                                name="username"
                                placeholder="Enter username"
                                type="text"
                                style={{ width: "100%" }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup floating>
                            <Label for="password" className='labels'>
                                Password
                            </Label>
                            <Input
                                id="password"
                                className='inputfield'
                                name="password"
                                placeholder="Enter password"
                                type="password"
                                style={{ width: "100%" }}
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup floating>
                            <Label for="cpassword" className='labels'>
                                Confirm Password
                            </Label>
                            <Input
                                id="cpassword"
                                className='inputfield'
                                name="cpassword"
                                placeholder="Enter password"
                                type="password"
                                style={{ width: "100%" }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormGroup>
                    </>
                )}
                <br />
                <div className='nextprebtns'>
                    {currentPage <= 3 && (
                        <button onClick={cancelprop} className='cancelButton'>Cancel</button>
                    )}
                    {currentPage >= 2 && (
                        <button className='previousButton' onClick={handlePrevious}>Previous</button>
                    )}
                    {currentPage < 3 && (
                        <button className='nextButton' onClick={handleNext}>Next</button>
                    )}
                    {currentPage === 3 && (
                        <button type='submit'>Confirm</button>
                    )}

                </div>

            </div>
        </form>
    )
}

export default Signup;