import {Sightseeing, Images} from "../models";
import HttpError from "http-errors";
import validate from "../services/validate";
import {imagesUpload} from "../services/imagesUploadServices";

class SightseeingController {
    static getAllSightseeing = async (req, res, next) => {
        try {
            const limit = 20;
            const offset = (+req.params.page - 1) * +limit
            const sightseeing = await Sightseeing.findAll({
                include: [{model: Images}],
                order: ['name', 'ASC'],
                logging: true,
                limit,
                offset
            })

            if (!sightseeing) {
                throw HttpError(404, "Sightseeing not found")
            }

            res.json({
                status: 'ok',
                sightseeing
            })
        } catch (e) {
            next(e);
        }
    };
    static addSightseeing = async (req, res, next) => {
        try {
            await validate(req.body, {
                name: 'required|string|min:3',
                address: 'required|string',
                comment: 'required|string',
            });
            const {name, address, comment} = req.body;
            const {files} = req;

            const data = await Sightseeing.create({
                name, address, comment
            })
            await imagesUpload(files, 'image-sightseeing', data);

            res.json({
                status: 'ok',
                data,
            })
        } catch (e) {
            next(e)
        }
    };
    static getSightseeingById = async (req, res, next) => {
        try {
            const {sightseeingId} = req.body;
            if(!sightseeingId) {
                throw HttpError(404, "This Sightseeing Not Found")
            }
            const sightseeing = await Sightseeing.findOne({
                where: {
                    id: sightseeingId
                }
            });

            res.json({
                status: 'ok',
                sightseeing
            })
        } catch (e) {
            next(e);
        }
    }
    //todo
    static updateSightseeing = async (req, res, next) => {
        try {
            const {name, address, comment} = req.body;
            const {files} = req;
            const {sightseeingId} = req.params;

            if (!sightseeingId) {
                throw HttpError(404, 'This Sightseeing Not Found')
            }
            if(!files) {
                const data = await Sightseeing.update(
                    {name, address, comment},
                    {
                        where: {
                            id: sightseeingId
                        }
                    });
                const updatedSightseeing = await Sightseeing.findOne({
                    where: {
                        id: sightseeingId
                    }
                })

                res.json({
                    status: 'ok',
                    updatedSightseeing
                })
            }
            const data = await Sightseeing.update(
                {name, address, comment},
                {
                    where: {
                        id: sightseeingId
                    }
                });
            await imagesUpload(files, 'image-sightseeing', data);

            const updatedSightseeing = await Sightseeing.findOne({
                where: {
                    id: sightseeingId
                }
            })

            res.json({
                status: 'ok',
                updatedSightseeing
            })
        } catch (e) {
            next(e);
        }
    }
}

export default SightseeingController;