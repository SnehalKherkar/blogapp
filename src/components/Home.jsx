import React, { useCallback, useEffect, useState } from 'react';
import "../styles/styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../redux/createSlice/getAllblogs';
import { likeBlog } from '../redux/createSlice/likeBlog';
import jwt_decode from "jwt-decode";
import { unLikeBlog } from '../redux/createSlice/unLikeBlog';
import { addComment } from '../redux/createSlice/addComment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const userId = decoded._id;
    const getblogs = useSelector((state) => state.blogs.blogs);
    const reversedBlogs = Array.isArray(getblogs) ? [...getblogs].reverse() : [];
    const [blogs, setBlogs] = useState([]);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllBlogs());
    }, []);

    useEffect(() => {
        setBlogs(reversedBlogs);
    }, [getblogs]);


    const handleLike = useCallback(async (blogId) => {
        try {
            await dispatch(likeBlog({ blogId: blogId }));
            await dispatch(getAllBlogs());
        } catch (error) {
            console.log(error)
        }
    }, [])
    const handleUnlike = useCallback(async (blogId) => {
        try {
            await dispatch(unLikeBlog({ blogId: blogId }));
            await dispatch(getAllBlogs());
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleSubmitComment = useCallback(async (blogId, content) => {
        try {
            console.log(blogId);
            await dispatch(addComment({ blogId: blogId, content: comment })).then((res) => toast.success("Comment added!"));
            await dispatch(getAllBlogs());
            await setComment("");
        } catch (error) {
            console.log(error)
        }
    }, [comment])
    const [isOpen1, setIsOpen1] = useState(false);


    const openModal1 = () => {
        setIsOpen1(true);
    }

    const closeModal12 = (e) => {
        console.log(e);
        axios.put(`http://localhost:5000/blogapp/blog/deleteBlog/${e}`, {},
            {
                headers: {
                    authorization: `${token}`
                }
            }).then((res) => {
                dispatch(getAllBlogs());
            }).catch((err) => console.log(err));

            setIsOpen1(false);


    }

    return (
        <>
            {blogs?.map((e, i) => {
                return (
                    <div style={{ padding: "2%" }} key={i}>
                        <div className='home'>
                            <img className='logohome' src={e.users[0].profile_picture} alt="" />
                            <p>{e.author}</p>
                            <img onClick={openModal1} style={{ marginTop: "2%" }} className='exctraabooutcomments' src="https://cdn-icons-png.flaticon.com/512/2311/2311523.png" alt="" />
                        </div>
                        {isOpen1 && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <span onClick={() => { closeModal12(e._id) }}>Delete Blog</span>
                                </div>
                            </div>
                        )}
                        <div>
                            <img className='postimg' onDoubleClick={() => handleLike(e._id)} src={e.image} alt="" />
                        </div>
                        <div className='contentpost'>
                            <p>{e.content}</p>
                        </div>
                        <div className='symbolsoflikecomment'>
                            {e.likes[e.likes.indexOf(userId)] === userId ? <img className='likelogo' onClick={() => handleUnlike(e._id)} src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" alt="" />
                                : <img className='likelogo' onClick={() => handleLike(e._id)} src="https://cdn-icons-png.flaticon.com/512/151/151910.png" alt="" />}

                            <img className='likelogo' onClick={() => navigate(`/blogDetails/${e._id}`)} src="https://cdn-icons-png.flaticon.com/512/3031/3031126.png" alt="" />
                        </div>
                        <div className='likecounts'>
                            {e.likesCount} likes
                        </div>
                        <div style={{ cursor: "pointer" }}>
                            {e.comments.length == 0 ? `` : (e.comments.length == 1 ? `View ${e.comments.length} Comment` : `View all ${e.comments.length} comments`)}
                        </div>
                        <form className='addcomment'>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment...' />
                            <img onClick={() => handleSubmitComment(e._id)} className='sendbtn' src="https://cdn-icons-png.flaticon.com/512/1309/1309305.png" alt="" />
                        </form>
                    </div>
                )
            })}
        </>
    )
}

export default Home;