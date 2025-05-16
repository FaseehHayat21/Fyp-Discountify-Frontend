import React, { useContext, useState, useEffect } from "react";
import "./AddPostStudent.css";
import { IoMdAdd } from "react-icons/io";
import registerContext from "../../../context/Register/RegisterContext";
import { useNavigate } from "react-router-dom";

export default function AddpostStudent() {
    const navigate = useNavigate();
    const context = useContext(registerContext);
    const { addPost } = context;

    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         navigate("/login");
    //     }
    // }, [navigate]);

    const [post, setPost] = useState({
        title: "",
        description: "",
        images: [],
    });

    const handleClick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);

        for (let i = 0; i < post.images.length; i++) {
            formData.append("images", post.images[i]);
        }

        addPost(formData);
        setPost({
            title: "",
            description: "",
            images: [],
        });
    };

    const onChange = (e) => {
        if (e.target.name === "image") {
            const filesArray = Array.from(e.target.files);
            setPost({ ...post, images: [...post.images, ...filesArray] });
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="post-page">
            <div className="post-container">
                <div className="content">
                    <h1 className="title">Post Your Query</h1>
                    <p className="subtitle">Ask, Learn, and Grow</p>
                </div>
                <div className="form-container">
                    <form className="post-form">
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Post Title
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={onChange}
                                placeholder="Enter your post title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-input"
                                id="description"
                                name="description"
                                value={post.description}
                                onChange={onChange}
                                placeholder="Write your post description"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className="form-label">
                                Upload Images
                            </label>
                            <input
                                type="file"
                                className="form-input"
                                id="image"
                                name="image"
                                onChange={onChange}
                                multiple
                                accept="image/*"
                            />
                        </div>
                        <button
                            className="btn-create-post"
                            type="submit"
                            onClick={handleClick}
                        >
                            <IoMdAdd className="icon-add" />
                            <span>Create Post</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
