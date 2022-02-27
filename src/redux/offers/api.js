const client = require ('../apiClient');
const {OFFERS_API_URL} = require ('../../constants/index');

export const get= ()=>
{
    return client.get(OFFERS_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(OFFERS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(OFFERS_API_URL,id);
}
export const add= (body)=>
{
    return client.post(OFFERS_API_URL,body);
}