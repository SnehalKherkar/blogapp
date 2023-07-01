import React, { useCallback, useEffect, useState } from 'react'
import "../styles/styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../redux/createSlice/getAllblogs';
import { likeBlog } from '../redux/createSlice/likeBlog';
import jwt_decode from "jwt-decode";
import { unLikeBlog } from '../redux/createSlice/unLikeBlog';
import { addComment } from '../redux/createSlice/addComment';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { singleBlog1 } from '../redux/createSlice/getSingleBlog';
import { getAllUsers } from '../redux/createSlice/getUsers';
import axios from 'axios';

const BlogDetails = () => {
    const { blogId } = useParams();
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const userId = decoded._id;
    const getSingleblog = useSelector((state) => state.singleBlog.singleBlog);
    const [blogs, setBlogs] = useState({});
    const [comment, setComment] = useState("");

    useEffect(() => {
        dispatch(singleBlog1({ blogId: blogId }));
        dispatch(getAllBlogs());
    }, [blogId]);

    useEffect(() => {
        setBlogs(getSingleblog);
    }, [getSingleblog]);

    const handleLike = useCallback(async (blogId) => {
        try {
            await dispatch(likeBlog({ blogId: blogId }));
            await dispatch(getAllBlogs());
            await dispatch(singleBlog1({ blogId: blogId }));
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleUnlike = useCallback(async (blogId) => {
        try {
            await dispatch(unLikeBlog({ blogId: blogId }));
            await dispatch(getAllBlogs());
            await dispatch(singleBlog1({ blogId: blogId }));
        } catch (error) {
            console.log(error)
        }
    }, [])
    const handleSubmitComment = useCallback(async (blogId, content) => {
        try {
            await dispatch(addComment({ blogId: blogId, content: comment })).then((res) => toast.success("Comment added!"));
            await dispatch(getAllBlogs());
            await dispatch(singleBlog1({ blogId: blogId }));
            setComment("");
        } catch (error) {
            console.log(error)
        }
    }, [comment]);
    const [openComments, setOpenComments] = useState(false);
    const [viewLikes, setViewlikes] = useState(false);

    const getusers = useSelector((state) => state.users.users);
    const [users, setusers] = useState([]);
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    useEffect(() => {
        setusers(getusers);
    }, [getusers])
    const [isOpen, setIsOpen] = useState(false);

    const [commentId, setCommentId] = useState("");
    const openModal = useCallback((e) => {
        setCommentId(e);
        setIsOpen(true);
    }, [])

    const closeModal = (e) => {
        axios.delete(`http://localhost:5000/blogapp/blog/deletecomment/${e}/${commentId}`,
            {
                headers: {
                    authorization: `${token}`
                },
            })
            .then((res) => {
                dispatch(getAllBlogs());
                dispatch(singleBlog1({ blogId: e }))
                setIsOpen(false);
            })
            .catch((error) => {
                console.log(error)
            })

    }


    const [isOpen1, setIsOpen1] = useState(false);


    const openModal1 = () => {
        setIsOpen1(true);
    }
    
    const navigate=useNavigate()
    const closeModal12 = (e) => {
        console.log(e);
        axios.put(`http://localhost:5000/blogapp/blog/deleteBlog/${e}`, {},
            {
                headers: {
                    authorization: `${token}`
                }
            }).then((res) => {
                dispatch(getAllBlogs());
                navigate("/home");
            }).catch((err) => console.log(err));

            setIsOpen1(false);

    }



    return (
        <>
            {blogs && Object.keys(blogs).length > 0 && (<div style={{ padding: "2%" }}>
                <div className='home'>
                    <img className='logohome' src={blogs.authorData.profile_picture} alt="" />
                    <p>{blogs.author}</p>
                    <img onClick={openModal1} style={{ marginTop: "2%" }} className='exctraabooutcomments' src="https://cdn-icons-png.flaticon.com/512/2311/2311523.png" alt="" />
                </div>
                {isOpen1 && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <span onClick={() => { closeModal12(blogs._id) }}>Delete Blog</span>
                        </div>
                    </div>
                )}
                <div>
                    <img className='postimg' onDoubleClick={() => handleLike(blogs._id)} src={blogs.image} alt="" />
                </div>
                <div className='contentpost1'>
                    <p>{blogs.content}</p>
                </div>
                <div className='symbolsoflikecomment'>
                    {blogs.likes[blogs.likes.indexOf(userId)] === userId ? <img className='likelogo' onClick={() => handleUnlike(blogs._id)} src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" alt="" />
                        : <img className='likelogo' onClick={() => handleLike(blogs._id)} src="https://cdn-icons-png.flaticon.com/512/151/151910.png" alt="" />}

                    <img className='likelogo' src="https://cdn-icons-png.flaticon.com/512/3031/3031126.png" alt="" />
                </div>
                <div onClick={() => setViewlikes(!viewLikes)} className='likecounts'>
                    {blogs.likesCount} likes
                </div>

                {viewLikes && (<div> Likes by:<br />
                    {(users.filter(elememt => blogs.likes.includes(elememt._id))).map((e, i) => {
                        return (
                            <div style={{ display: "flex" }} className='likesphoto' key={i}>
                                <img className='likesbyphoto' src={e.profile_picture} alt="" />
                                <span style={{ cursor: "pointer" }}>{e.username}</span>
                            </div>
                        )
                    })}</div>)}

                <div onClick={() => setOpenComments(!openComments)} style={{ cursor: "pointer" }}>
                    {blogs.comments.length === 0 ? `` : (blogs.comments.length === 1 ? `View ${blogs.comments.length} Comment` : `View all ${blogs.comments.length} comments`)}
                </div>
                {openComments && blogs.comments.map((e, i) => {
                    return (
                        <div className='comments' key={i}>
                            <span>{e.author}</span>
                            <h6>{e.content}</h6>
                            <img onClick={() => openModal(e._id)} className='exctraabooutcomments' src="https://cdn-icons-png.flaticon.com/512/2311/2311523.png" alt="" />
                            <hr />
                        </div>
                    )
                })}
                {isOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <span onClick={() => { closeModal(blogs._id) }}>Delete Comment</span>
                        </div>
                    </div>
                )}
                <form className='addcomment'>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment...' />
                    <img onClick={() => handleSubmitComment(blogs._id)} className='sendbtn' src="https://cdn-icons-png.flaticon.com/512/1309/1309305.png" alt="" />
                </form>
            </div>)}
        </>
    )
}
export default BlogDetails;