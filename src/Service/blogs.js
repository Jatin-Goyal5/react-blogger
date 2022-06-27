import axios from 'axios';
const crawlBlogs = async (tag)=>{
    try{
        console.log("in blog",tag);
        const urlResponse = await axios({
            method: 'get',
            url:`https://medium-blogger-crawler.herokuapp.com/blog?tag=${tag}`,
            withCredentials: false,
            
        })
        return urlResponse.data;
    }catch(err){
        console.log(err.message);
    }
}
export default crawlBlogs;