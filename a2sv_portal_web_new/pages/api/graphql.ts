import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
