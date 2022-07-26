import HttpErrors from 'http-errors';
import JWT from 'jsonwebtoken';
import validate from '../services/validate';
import {Images, Users} from '../models';
import {sendEmail} from '../services/mailRequest';
import sharp from "sharp";
import {v4 as uuidV4} from "uuid";
import Promise from "bluebird";
import fs from "fs";
import path from "path";

const {JWT_SECRET} = process.env;

class UsersController {
    static register = async (req, res, next) => {
        try {
            await validate(req.body, {
                firstName: 'required|string|min:3',
                lastName: 'required|string|min:3',
                age: 'required|string|min:2',
                gender: 'required|string|in:male,female',
                email: 'required|email',
                phoneNumber: 'required|phone',
                password: 'required|string|min:6',
            });

            const {firstName, lastName, age, gender, email, phoneNumber, password} = req.body;

            const exists = await Users.findOne({
                where: {email},
                attributes: ['id'],
            });

            if (exists) {
                throw HttpErrors(422, {
                    errors: {
                        error: ['email already exists'],
                    },
                });
            }
            sendEmail(email);

            const user = await Users.create({
                firstName, lastName, age, gender, email, phoneNumber, password
            });

            res.json({
                status: 'ok',
                message: 'you have successfully registered',
                user,
            });
        } catch (e) {
            next(e);
        }
    };
    static login = async (req, res, next) => {
        try {
            validate(req.body, {
                email: 'required|email',
                password: 'required|string',
            });
            const {email, password} = req.body;
            const user = await Users.findOne({
                where: {email},
            });
            if (!user || user.getDataValue('password') !== Users.hash(password)) {
                throw HttpErrors(403, 'wrong password or email');
            }
            const token = JWT.sign({userId: user.id}, JWT_SECRET);
            res.json({
                status: 'ok',
                token,
                user,
            });
        } catch (e) {
            next(e);
        }
    };
    static accountMe = async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await Users.findOne({
                where: {id: userId},
            });

            res.json({
                status: 'ok',
                user
            });
        } catch (e) {
            next(e);
        }
    };
    static update = async (req, res, next) => {
        try {
            const {firstName, lastName, age, gender, email, phoneNumber, password} = req.body;
            const {userId} = req.params;
            const {file} = req;

            if (password) {
                const user = await Users.update({
                    firstName, lastName, age, gender, email, phoneNumber, password
                }, {
                    where: {
                        id: userId
                    }
                });
                const token = JWT.sign({userId: user.id}, JWT_SECRET);

                const updatedUser = await Users.findOne({
                    where: {id: userId},
                });
                res.json({
                    status: 'ok',
                    updatedUser,
                    token
                });
            }

            if (!file) {
                await Users.update({
                    firstName, lastName, gender, age, email, phoneNumber
                }, {
                    where: {
                        id: userId
                    },
                });
                const updatedUser = await Users.findOne({
                    where: {id: userId},
                });
                res.json({
                    status: 'ok',
                    updatedUser,
                });
            }

            const dir = path.join(__dirname, `../public/images/avatar-image`)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            const fileName = `${uuidV4()}.jpg`;
            const filePath = path.join(dir, `${fileName}`);
            await Promise.all([
                sharp(file.buffer)
                    .rotate()
                    .resize(512)
                    .toFile(filePath),
                sharp(file.buffer)
                    .rotate()
                    .resize(512)
                    .toFile(filePath + '.webp')
            ]);
            const avatarPath = path.join(`/images/avatar-image/${fileName}`)

            await Users.update({
                firstName, lastName, gender, age, email, phoneNumber, avatar: avatarPath
            }, {
                where: {
                    id: userId
                },
            });

            const updatedUser = await Users.findOne({
                where: {id: userId},
            });
            res.json({
                status: 'ok',
                updatedUser,
            });
        } catch (e) {
            next(e);
        }
    };
    static delete = async (req, res, next) => {
        try {
            const {userId} = req.params;
            if (!userId) {
                throw HttpErrors(404, 'User not found');
            }
            await Images.destroy({
                where: {
                    id: userId
                }
            })
            await Users.destroy({
                where: {id: userId},
            });

            res.json({
                status: 'ok'
            });
        } catch (e) {
            next(e);
        }
    };
}

export default UsersController;
