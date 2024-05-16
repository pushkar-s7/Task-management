const Jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express"

const key = "secretTask"
export const Auth = (req: Request, resp: Response, next: NextFunction) => {
  let token = req.headers["authorization"]

  if (token) {
    token = token.split(" ")[1]
    Jwt.verify(token, key, (err: Error, valid: any) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" })
      } else {
        next()
      }
    })
  } else {
    resp.status(403).send({ result: "Please provide token with headers" })
  }
}
