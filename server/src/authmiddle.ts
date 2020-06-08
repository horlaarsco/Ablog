import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header("Authorization")) {
    res.status(401).json({ error: "Not authorized to access this resource" });
  }
  const token = req.header("Authorization")!.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(token, "process.env.JWT");
    if (!id) {
      throw new Error();
    }
    // @ts-ignore
    req.id = id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Not authorized to access this resource too" });
  }
};
