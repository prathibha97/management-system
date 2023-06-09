/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
function isCookieExpired(cookieName) {
  const cookiePairs = document.cookie.split(';');

  for (let i = 0; i < cookiePairs.length; i++) {
    const [name, _] = cookiePairs[i].split('=');

    if (name.trim() === cookieName) {
      return false; // Cookie exists and not expired
    }
  }

  return true; // Cookie doesn't exist or expired
}
export default isCookieExpired;