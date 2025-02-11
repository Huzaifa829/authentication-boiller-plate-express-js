import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(401).json({ messege: 'sahe token lago' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err,user) => {
    console.log(err);
    if (err) return res.status(403).json({ message: 'Unauthorized Token' });
    req.user = user;
    console.log(req.user);
    next();
  });
};
