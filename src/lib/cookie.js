const cookieSchema = require("../model/cookie");

//generate random token 
const generate_token = (length)=> {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}


///creates new cookie token and saves it to the DB
const createCookie  = (ip, sessionToken) => {
    const cookie = generate_token(32);
    try {
        const newCookie = new cookieSchema({
            ip : ip,
            sessionToken : sessionToken,
            cookie : cookie,
        }) 

        newCookie.save(); 
        return cookie;      
    } catch (error) {
        return Error(`${error.message} at cookie.js for more detail ${error.stack}`)
    }

}

//get the cookie and generate a new token for the cookie
const updateCookie = async(ip) => {
  try {
    const newCookieToken = generate_token(32);
    const cookie = await cookieSchema.findOneAndUpdate({ip : ip}, {cookie : newCookieToken});
    return newCookieToken;      
  } catch (error) {
    return Error(`${error.message}`);
  }

}


module.exports = {createCookie, updateCookie};