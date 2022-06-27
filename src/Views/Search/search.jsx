import React, { useState,useEffect } from "react";
import { ImNext, ImSearch } from "react-icons/im";
import {GrLinkNext} from 'react-icons/gr'
import { useLocation } from 'react-router-dom'
import crawlBlogs from '../../Service/blogs';
import Blog from "../Blogs/blog";
import './search.css';
import getSuggestion from "../../Service/suggestion";
function Search({location}){
    const [tag , setTag]  = useState('');
    const [blogs , setBlogs] = useState([]);
    const [loading, setLoading] = useState();
    const [page, setPage] = useState(0);
    const [suggestionTag, setSuggestion] = useState([]);
    const [time , setTime] = useState('');
    const addSearchHistory =()=>{
        let history = window.sessionStorage.getItem('history');
        if(history){
            
           history= window.sessionStorage.getItem('history');
           if(history.includes(tag)){
            return;
           }
           history += ","+tag;
           window.sessionStorage.setItem('history',history);
           console.log(history)
        }else{
            window.sessionStorage.setItem('history',tag);

        }
    }
    
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            let before = (performance.now());
            addSearchHistory();
            let blogsResponse = await crawlBlogs(tag);
            blogsResponse=  blogsResponse.length == 0 ?[] : blogsResponse.data;
            if(blogsResponse==undefined ||  blogsResponse.length == 0){
                let suggestion = await getSuggestion(tag);
                setSuggestion(suggestion.data);                
            }else{
                setBlogs(blogsResponse);
            }
            let after = performance.now();
            setTime(after-before);
            setPage(1);
            setLoading(false);
            setBlogs(blogsResponse);

            
        }
    }
    const onSubmit = async () => {
        setLoading(true);
        addSearchHistory();
        let before = (performance.now());
        console.log(tag);
        let blogsResponse = await crawlBlogs(tag);
        blogsResponse=  blogsResponse.length == 0 ?[] : blogsResponse.data;
        if(blogsResponse==undefined ||  blogsResponse.length == 0){
            let suggestion = await getSuggestion(tag);
            setSuggestion(suggestion.data);
            
        }
        setBlogs(blogsResponse);
        let after = performance.now();
        setTime(after-before);
        setPage(1);
        setLoading(false);

            
    }
    

    const onNext = async ()=>{
        try{
        let pageIncrement = page+1;
        let suggestion = await getSuggestion(tag);
        if(suggestion.data.length > pageIncrement){
            setLoading(true);
            let nexttag = suggestion.data[pageIncrement].toString();
            setPage(pageIncrement);
            let blogsResponse = await crawlBlogs(suggestion.data[pageIncrement]);
            blogsResponse=  blogsResponse.length == 0 ?[] : blogsResponse.data;
            setLoading(false);
            setBlogs(blogsResponse);

        }
        }catch(err){

        }
    }

    return (
    <div className="container">
        <h1>{time}</h1>
        <input
          id="input_tag"
          value={tag} 
          onChange={(e) => { setTag(e.target.value); }} 
          onKeyPress={handleKeyPress}
          type='text'
          placeholder="search for blog"
        />
       <button className = "input_button" onClick={onSubmit}>
        <ImSearch></ImSearch>
       </button>
       {window.sessionStorage.getItem('history')?<h2>{window.sessionStorage.getItem('history')}</h2>:<></> }
       {loading == true?<h1>Loading ...</h1>:
           blogs.length === 0 ?
           <div>
            <h1>No Data Found</h1>
            <br></br>
                <div className="movies">
                    <h3>suggestion Tag</h3>
                    {suggestionTag && suggestionTag.length > 0 && suggestionTag.map((data)=>{
                        return <h3>{data}</h3>
                    })}
                </div>
            </div>
           :<div className="movies">
            {
                blogs.map((blog)=>{
                   return (<Blog blog={blog}></Blog>);
                })
            }
           </div>
       }

       <div className="next_div">

       {blogs.length ?<button className="next_button" onClick={onNext}>Next<GrLinkNext></GrLinkNext></button>:<></>}
       </div>
    </div>

    );
}

export default Search;