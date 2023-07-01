import React, { useEffect, useState } from 'react';
import eye from "../images/eye.png";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/createSlice/getUsers';
import jwtDecode from 'jwt-decode';

const LeftSidepage = () => {
  const dispatch = useDispatch();
  const getusers = useSelector((state) => state.users.users);
  const [users, setusers] = useState([]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(()=>{
    setusers(getusers);
  },[getusers]);

  const token=localStorage.getItem("token");
  const decode=jwtDecode(token);
  const id=decode._id
  const filteredUsers = users?.filter((user) => user._id !== id);

  return (
    <div>
      {filteredUsers?.map((e, i) => {
        return (
          <div key={i}>
            <div className='userlist'>
              <img className='userlogo' src={e.profile_picture} alt="" />
              <div className='userlist1'>
                <p>{e.username}</p>
                <p>{e.First_Name} {e.Last_Name}</p>
              </div>
              <img className='viewlogo' src={eye} alt="" />
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default LeftSidepage;
