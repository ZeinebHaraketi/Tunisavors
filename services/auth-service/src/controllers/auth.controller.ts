import { Request, Response } from 'express';
import * as authService from '../service/auth.service';

export const requestMagicLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.sendMagicLink(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyMagicLink = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.query;
    const result = await authService.verifyMagicLink(token as string, email as string);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};



export const register = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.registerUserWithMagicLink(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.loginUserWithMagicLink(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
