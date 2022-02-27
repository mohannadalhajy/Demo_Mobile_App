//export const BASEURL = 'http://10.126.1.145:3000';
export const BASEURL = 'http://node-express-env.eba-wtui3e37.us-east-2.elasticbeanstalk.com';
export const PREFIX = "Offers";

///Auth URL
export const AUTH_API_URL = BASEURL+'/driversAuth';
export const LOGIN_API_URL = AUTH_API_URL + '/login';
export const REGISTER_API_URL = AUTH_API_URL + '/register';
export const LOGOUT_API_URL = AUTH_API_URL+'/logout';

///Profile URL
export const PROFILE_API_URL = BASEURL+'/driverProfile';
export const PROFILE_ME_API_URL = PROFILE_API_URL+'/profileMe';
export const UPDATE_PASSWORD_API_URL = PROFILE_API_URL+'/updatePassword';
export const UPDATE_EMAIL_API_URL = PROFILE_API_URL+'/updateEmail';

/////Offers URL
export const OFFERS_API_URL = BASEURL+'/offers'
export const OFFERS_IMAGES_API_URL = BASEURL+'/offersImages/'
export const OFFERS_UPLOAD_IMAGES_API_URL = OFFERS_API_URL+'/uploadimage'

///auth route
export const RESET_PASSWORD_ROUTE = PREFIX + '/resetPass';
export const RESET_EMAIL_ROUTE = PREFIX + '/resetEmail';
export const LOGIN_ROUTE = PREFIX + 'login';
export const REGISTER_ROUTE = PREFIX + 'register';
export const PROFILE_ROUTE = PREFIX + '/profile';
export const ADD_USER_ROUTE = PREFIX + '/addUser';
export const EDIT_USER_ROUTE = PREFIX + '/editUser';

////offers route
export const PREFIX_ROUTE = PREFIX;
export const OFFERS_ROUTE = PREFIX
export const OFFER_DETAILS_ROUTE = OFFERS_ROUTE + 'Details'
export const OFFER_ADD_ROUTE = OFFERS_ROUTE + 'Add'
/////

export const EMIRATES = ["AJM", "SHJ", "DUBAI", "UQ","AD", "FUJ", "RAK", "AIN","WEST"]
export const EMIRATES_ARABIC = ["عجمان", "الشارقة", "دبي", "أم القيوين","أبو ظبي", "الفجيرة", "رأس الخيمة", "العين","الغرب"]
export const BACKGROUND = {
    color:'#FF00'
}