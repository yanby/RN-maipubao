var md5 = require("crypto-js/md5");

export function md5HashX(password) {
  let key1 = "696C6F7665737175616C6C";
  let key2 = "383631303038";
  let passwordEncrypt = md5(key1 + password + key2);
  return passwordEncrypt.toString().substring(2, 2 + 14).toUpperCase()	;
}
