import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/createSlice/getUsers';
import { getAllBlogs } from '../redux/createSlice/getAllblogs';
import { Col, Row } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { singleBlog1 } from '../redux/createSlice/getSingleBlog';

const RightSidePage = () => {
  const dispatch = useDispatch();
  const getusers = useSelector((state) => state.users.users);
  const [users, setusers] = useState([]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setusers(getusers);
  }, [getusers]);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const id = decode._id
  const filteredUsers = users?.filter((user) => user._id === id);

  const getblogs = useSelector((state) => state.blogs.blogs);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    setBlogs(getblogs);
  }, [getblogs]);
  const filterBlogs = blogs?.filter((blog) => blog.userid === id);

  const navigate=useNavigate();
  

  

  return (
    <div>
      {filteredUsers?.map((e, i) => {
        return (
          <div key={i}>
            <div className='userlist'>
              <img className='userlogo' src={e.profile_picture} alt="" />
              <div className='userlist1' style={{ marginLeft: "2%" }}>
                <p>{e.username}</p>
                <p>{e.First_Name} {e.Last_Name}</p>
              </div>

            </div>
            <div className='bpost'>
              <span>No Of Blogs Posted</span>
              <span> : </span>
              <span style={{ color: "blue" }}>{filterBlogs?.length}</span>
              <hr />
            </div>
          </div>
        )
      })}
      <Row>
        {filterBlogs?.map((e, i) => {
          return (
            <Col key={i} md={6} className='postImage'>
              <img onClick={()=>{navigate(`/blogDetails/${e._id}`)}} src={e.image} alt="" />
            </Col>
          );
        })}
      </Row>

    </div>
  )
}

export default RightSidePage;
