import axios from 'axios';
const getSuggestion = async (tag)=>{
    try{
        const urlResponse = await axios({
            method: 'get',
            url:`http://localhost:5000/blog/suggestedTags?tag=${tag}`,
            withCredentials: false,
            
        })
        return urlResponse.data;
    }catch(err){
        console.log(err.message);
    }
}
export default getSuggestion;