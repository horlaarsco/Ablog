import express, { Request, Response } from "express";
import { signUp, logIn, logOut } from "./controller";
import { checkAuth } from "./authmiddle";
import User from "./schema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Home");
});

router.get("/me", checkAuth, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.id);
  res.json(user);
});

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout/:id", logOut);

export default router;
