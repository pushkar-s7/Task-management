import "reflect-metadata"
import AppDataSource from "../dataBase/config"
import Userr from "../entities/userr"
import { Request, Response } from "express"
const jwt = require("jsonwebtoken")

const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body

  const userRepository = AppDataSource.getRepository(Userr)
  const userExist = await userRepository.findOne({ where: { email } })

  if (userExist) {
    return res
      .status(400)
      .send("Email is already exist, Please enter new Email")
  }

  const newUser = userRepository.create({ username, password, email })
  const result = await userRepository.save(newUser)

  return res.status(200).send(result)
}

const signin = async (req: Request, res: Response) => {
      const { email, password } = req.body

      const userRepository = AppDataSource.getRepository(Userr)
      const user = await userRepository.findOne({ where: { email, password } })

      if (user) {
        const token = jwt.sign({ name: user.username,email: user.email,},"secretTask",
                               { expiresIn: "24h" })

        return res.status(200).send({token,
          username: user.username,
          email: user.email,
          id: user.id,
        })
      } else {
        return res.status(400).send("Email or password are not register please SignUp first")
      }
}

module.exports = { register, signin }
