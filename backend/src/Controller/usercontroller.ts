import "reflect-metadata"
import AppDataSource from "../dataBase/config";
import Userr from "../entities/userr";
import { Request, Response } from "express";
const validator = require('validator');
const jwt = require('jsonwebtoken');

const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    try {
        if (!username) return res.status(400).send('username is required');
        if (!email) return res.status(400).send('email is required');
        if (!validator.isEmail(email)) {
            return res.status(400).send('enter valid email id');
        }
        if (!password || password.length < 6) {
            return res.status(400).send('enter valid password');
        }

        const userRepository = AppDataSource.getRepository(Userr);
        const userExist = await userRepository.findOne({ where: { email } });

        if (userExist) {
            return res.status(400).send('Email is already exist, Please enter new Email');
        }

        const newUser = userRepository.create({ username, password, email });
        const result = await userRepository.save(newUser);

        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send('Error creating user');
    }
};

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (email && password) {
            const userRepository = AppDataSource.getRepository(Userr);
            const user = await userRepository.findOne({ where: { email, password } });

            if (user) {
                const token = jwt.sign({ _id: user.id }, 'kljclsadflkdsjfklsdjfklsdjf', { expiresIn: '24h' });
                return res.status(200).send({
                    token,
                    username: user.username,
                    email: user.email,
                    id: user.id,
                });
            } else {
                return res.status(400).send('Invalid email or password');
            }
        } else {
            return res.status(400).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send('login failed');
    }
};



module.exports={ register,signin };


