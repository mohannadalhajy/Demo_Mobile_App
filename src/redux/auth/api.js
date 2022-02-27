const client = require ('../apiClient');
const {BASEURL, LOGIN_API_URL, LOGOUT_API_URL, PROFILE_ME_API_URL, UPDATE_EMAIL_API_URL, UPDATE_PASSWORD_API_URL, LOCATION_API_URL, REGISTER_API_URL } = require ('../../constants');

export const login= (body)=>
{
    return client.post(LOGIN_API_URL,body);
}
export const register= (body)=>
{
    return client.post(REGISTER_API_URL,body);
}
export const logout= async(body)=>
{
    const data = client.post(LOGOUT_API_URL,body);
    return data;
}
export const getProtected= async()=>
{
    return client.get(BASEURL);
}
export const getProfile= ()=>
{
    return client.get(PROFILE_ME_API_URL);
}
export const editEmail= async(body)=>
{
    const data = client.putWithoutId(UPDATE_EMAIL_API_URL,body);
    return data;
}
export const resetPass= async(body)=>
{
    const data = client.putWithoutId(UPDATE_PASSWORD_API_URL,body);
    return data;
}
export const setLocation = async(body)=>
{
    const data = client.patchWithoutId(LOCATION_API_URL,body);
    return data;
}