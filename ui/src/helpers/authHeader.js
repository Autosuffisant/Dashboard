import Cookies from 'js-cookie';

export default function authHeader() {
  // return authorization header with jwt token
  const auth = Cookies.get('auth');

  if (auth) {
    return `Token ${auth}`;
  }
  return {};
}
