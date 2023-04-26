import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not found in cookies' });
  }
  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const username = decodedToken.username;
    req.username = { username };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}
