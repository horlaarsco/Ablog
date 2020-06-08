import { Request, Response } from "express";

import User from "./schema";

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.generateToken();

    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Username or email already exist");
    } else {
      res.status(400).json(err);
    }
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // @ts-ignore
    const user = await User.validateUser(email, password);
    await user!.generateToken();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const logOut = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // @ts-ignore
    const user = await User.findByIdAndUpdate(id);
    user.token = "";
    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
