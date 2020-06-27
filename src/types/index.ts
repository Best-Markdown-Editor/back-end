import { Request, Response } from "express";

export interface ExpressContext {
  req: Request;
  res: Response;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

// export interface RegisterData {
//   username: string;
//   email: string;
//   password: string;
// }
