import jwtDecode from 'jwt-decode';

export function decodeJWT(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el JWT:', error);
    return null;
  }
}

  