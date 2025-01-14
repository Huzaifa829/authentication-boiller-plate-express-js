import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

export const acessToken = (user) => {
  const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, {
    expiresIn: '15m',
  });
  return token;
};

export const refreshToken = (user) => {
  const token = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN, {
    expiresIn: '7d',
  });
  return token;
};
