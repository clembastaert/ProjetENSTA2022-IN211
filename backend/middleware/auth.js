import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token not found in Authorization header' });
  }
  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const username = decodedToken.username;
    req.username = username;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}
