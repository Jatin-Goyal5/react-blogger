import axios from 'axios';
const getSuggestion = async (tag)=>{
    try{
        const urlResponse = await axios({
            method: 'get',
            url:`https://medium-blogger-crawler.herokuapp.com/blog/suggestedTags?tag=${tag}`,
            withCredentials: false,
            
        })
        return urlResponse.data;
    }catch(err){
        console.log(err.message);
    }
}
export default getSuggestion;