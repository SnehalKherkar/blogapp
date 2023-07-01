import React, { useCallback, useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import { addBlog } from '../redux/createSlice/addBlog';
import { toast } from 'react-toastify';
import { getAllBlogs } from '../redux/createSlice/getAllblogs';

const Addblog = () => {
    const [image, setImage] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setImage(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleImageChange = useCallback((e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    },[image])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop,
    });


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const postBlog = async (e) => {
        e.preventDefault();
        console.log(image, title, tags, content);
        dispatch(addBlog({ image, title, content, tags }))
            .then(() => {
                toast.success("Blog added Successfully!")
                dispatch(getAllBlogs());
                navigate("/home");
            });
    }
    const handleTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    },[title])

    const handleContentChange = useCallback((e) => {
        setContent(e.target.value);
    },[content])

    const handletagsChange = useCallback((e) => {
        setTags(e.target.value);
    },[tags])

    return (
        <div style={{ padding: '2%', marginTop: '2.5%' }}>
            <form onSubmit={postBlog}>
                <FormGroup>
                    <Label for="imageUpload">Upload Image:-</Label>
                    <div className="dropzone" {...getRootProps()}>
                        <Input {...getInputProps()} id="imageUpload" type="file" onChange={handleImageChange} />
                        {imagePreview ? (
                            <img className="preview" src={imagePreview} alt="Image Preview" />
                        ) : (
                            <p className="placeholder">Drag and drop an image file here, or click to select a file.</p>
                        )}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="title">Title:-</Label>
                    <Input type="text" id="title" value={title} onChange={handleTitleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content:-</Label>
                    <Input type="textarea" id="content" value={content} onChange={handleContentChange} style={{ height: '500px' }} />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Tags:-</Label>
                    <Input type="text" id="tags" value={tags} onChange={handletagsChange} />
                </FormGroup>
                <br />
                <div className="PostFormBtns">
                    <button className="btn-danger" onClick={() => navigate('/home')} style={{ marginRight: '2%' }}>
                        CANCEL
                    </button>
                    <button type="submit" className="btn-primary" style={{ marginLeft: '2%' }}>
                        POST BLOG
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addblog;
