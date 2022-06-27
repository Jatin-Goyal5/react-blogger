import React, { useEffect,useState } from "react";
import './post.css';

import { Link } from "react-router-dom";
function Post(){
    const [postData , setPost] = useState(null);
    useEffect(()=>{
        let data = localStorage.getItem('post');
        data = JSON.parse(data);
        setPost(data);
    },[]);
   
    return (<>
    {postData === null || postData === {} ?
                <div>Loading ....</div> :
        <div className="blog">
            <h1>{postData.title}</h1>
            <h3>BY - {postData.creator}</h3>
            <img src={postData.post.imgSrc}></img>
           <div className="content">
           {
             postData.post.data === [] || postData.post.data=== undefined ?
                <div>No Data</div> :
                postData.post.data.map((element) => {
                    console.log(postData.relatedtags[2]);
                    return (element.tag === 'p' ?
                        <h2>{element.content}</h2> :
                        <h1>{element.content}</h1>)
                })
      
           }
          <div className="relatedTags">
            <h4>Related Tags  --   </h4>
            {
                postData.relatedtags=== [] || postData.relatedtags=== undefined ?
                <div>No Tags</div> :
                postData.relatedtags.map((element) => {
                    return <Link to={`/tag/${element}`} target= "_blank">
                        <h5>    *{"       "+element+"       "}</h5>
                        <br></br>
                        </Link>
                        
                })
            }
        </div>

           <a href= {postData.link}>Source URL {postData.link} </a>
           
           </div>
        </div>
 } 
</>);

}

export default Post;