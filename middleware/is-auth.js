import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  req.isAuth = false;
  req.isDeanAuth = false;
  const authHeader = req.headers['Authorization'];
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return next();
  }
  if (!decodedToken) {
    return next();
  }
  
  req.userId = decodedToken.userId;
  req.isDeanAuth = decodedToken.role === 'dean' ? true : false;
  req.isAuth = true;
  next();
};

export default isAuth;