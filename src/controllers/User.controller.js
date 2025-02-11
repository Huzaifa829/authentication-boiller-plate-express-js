import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.model.js';
import { acessToken, refreshToken } from '../tokenMethods/index.js';

export const SignUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(404).json({ messege: 'email required' });
  if (!password) return res.status(404).json({ messege: 'email required' });

  const checkEmail = await UserModel.findOne({ email });

  if (checkEmail) return res.status(400).json({ messege: 'already exist' });

  const created = await UserModel.create({
    email,
    password,
  });

  const acesToken = acessToken(created);
  const refreshTken = refreshToken(created);

  res.cookie('resfresh_token', acesToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(201).json({
    messege: 'user created',
    user: created,
    accessToken: acesToken,
  });
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(404).json({ messege: 'email required' });
  if (!password) return res.status(404).json({ messege: 'email required' });

  const checkEmail = await UserModel.findOne({ email });

  if (!checkEmail) return res.status(400).json({ messege: 'No user found' });

  const isValidPass = await bcrypt.compare(password, checkEmail.password);

  if (!isValidPass) return res.status(401).json({ messege: 'incorrect pas' });

  const acesToken = acessToken(checkEmail);
  const refreshTken = refreshToken(checkEmail);

  res.cookie('resfresh_token', refreshTken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(201).json({
    messege: 'user created',
    user: checkEmail,
    accessToken: acesToken,
  });
};

export const updteUser = async (req, res) => {
  const { email } = req.user;
  const data = req.body;

  const updateDta = await UserModel.findOneAndUpdate({email:email},data,{
    new:true,
  });

  if(!updateDta){
    return res.status(401).json({messege:"problem"})
  }
  res.status(202).json({
    updateDta,
    messege:"worked"
  })
};
