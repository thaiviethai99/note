var CryptoJS = require("crypto-js");
// Encrypt 
var ciphertext = CryptoJS.AES.encrypt('my message', 's3rsdfdsg4t24sfds##@$%');
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 's3rsdfdsg4t24sfds##@$%')
//console.log(ciphertext.toString());
//console.log(bytes.toString(CryptoJS.enc.Utf8));

function encrypt(msg){
	return CryptoJS.AES.encrypt(msg, 's3rsdfdsg4t24sfds##@$%').toString();
}

function decrypt(en){
	return CryptoJS.AES.decrypt(en, 's3rsdfdsg4t24sfds##@$%').toString(CryptoJS.enc.Utf8);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;