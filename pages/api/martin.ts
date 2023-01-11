// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import data from "./martin.json";

// console.log("api", data);// backend

// type Data = {
//   name: unknown
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { userName } = req.query ;
  // res.status(200).json([{ name: userName },])
  // fetch("./martin.json")
  // .then(console.log)
  res.status(200).json(data);
}
