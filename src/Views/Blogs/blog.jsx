import React from "react";
import { Link } from "react-router-dom";
import './blog.css'
function Blog({blog}){
    const postTitle = blog.title.split(' ').join('-');
    const handleOnClick = (e) => {
        blog.post= JSON.parse(blog.post);
        blog.relatedtags = JSON.parse(blog.relatedtags)
        localStorage.setItem('post', JSON.stringify(blog));
    }
    return (
        
        blog === undefined ?
            <div>Loading</div> :
            <div className="movie-item">
            <Link to={`/post/${postTitle}`} target="_blank"  style={{ textDecoration: 'none',color:"white" }}>
            <div className="blog-info" onClick={handleOnClick}>
                <div>{blog.title}</div>
                <div>{blog.preview.length >200 ? blog.preview.substr(0,200)+"...":blog.preview}</div>
                <div className="blog-detail">
                <div >{blog.creator}</div>
                <div >{blog.details}</div>
                </div>
                
            </div>
            </Link>
          </div>
    );
}

export default Blog;