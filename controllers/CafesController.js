import {Cafes, Images} from "../models";
import HttpErrors from "http-errors";
import validate from "../services/validate";
import {imagesUpload} from "../services/imagesUploadServices";
import HttpError from "http-errors";


class CafesController {
    static getAllCafes = async (req, res, next) => {
        try {
            const limit = 20;
            const offset = (+req.params.page - 1) * +limit
            const cafes = await Cafes.findAll({
                include: [{model: Images}],
                order: ['name', 'ASC'],
                logging: true,
                limit,
                offset
            });
            if (!cafes) {
                throw HttpErrors(404, "Cafes not found")
            }
            res.json({
                status: 'ok',
                cafes
            })
        } catch (e) {
            next(e)
        }
    }
    static addCafe = async (req, res, next) => {
        try {
            await validate(req.body, {
                name: 'required|string|min:3',
                address: 'required|string',
                phone: 'required|phone',
            });
            const {name, address, phone} = req.body;
            const {files} = req;

            const data = await Cafes.create({
                name, address, phone,
            })
            await imagesUpload(files,'image-cafe',data)


            res.json({
                status: 'ok',
                data,

            })
        } catch (e) {
            next(e)
        }
    }
    static getCafeById = async (req,res,next) => {
        try {
            const {cafeId} = req.body;
            const cafe = await Cafes.findOne({
                where: {
                    id: cafeId
                }
            });

            res.json({
                status: 'ok',
                cafe
            })
        }catch (e) {
            next(e);
        }
    }
    //todo
    static updateCafe = async (req, res, next) => {
        try {

            const {name, address, phone} = req.body;
            const {files} = req;
            const {cafeId} = req.params;

            if (!cafeId) {
                throw HttpError(404, 'This Cafe Not Found')
            }
            if(!files) {
                const data = await Cafes.update(
                    {name, address, phone},
                    {
                        where: {
                            id: cafeId
                        }
                    });

                const updatedCafe = await Cafes.findOne({
                    where: {
                        id: cafeId
                    }
                })
                res.json({
                    status: 'ok',
                    updatedCafe
                })
            }
            const data = await Cafes.update(
                {name, address, phone},
                {
                    where: {
                        id: cafeId
                    }
                });
            await imagesUpload(files, 'image-sightseeing', data);

            const updatedCafe = await Cafes.findOne({
                where: {
                    id: cafeId
                }
            })
            res.json({
                status: 'ok',
                updatedCafe
            })
        } catch (e) {
            next(e);
        }
    }
}

export default CafesController;