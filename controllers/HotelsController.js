import {Hotels, Images} from "../models";
import HttpErrors from "http-errors";
import validate from "../services/validate";
import {imagesUpload} from "../services/imagesUploadServices";
import HttpError from "http-errors";


class HotelsController {
    static getAllHotels = async (req, res, next) => {
        try {
            const limit = 20;
            const offset = (+req.params.page - 1) * +limit
            const hotels = await Hotels.findAll({
                include: [{model: Images}],
                order: ['name', 'ASC'],
                logging: true,
                limit,
                offset
            });

            if (!hotels) {
                throw HttpErrors(404, "Hotels not found")
            }
            res.json({
                status: 'ok',
                hotels
            });
        } catch (e) {
            next(e);
        }
    };
    static addHotel = async (req, res, next) => {
        try {
            await validate(req.body, {
                name: 'required|string|min:3',
                address: 'required|string',
                price: 'required|string',
                phone: 'required|phone',
                comment: 'required|string',
                facilities: 'required|string',
            });
            const {name, address, phone, price, comment, facilities} = req.body;
            const {files} = req;

            const data = await Hotels.create({
                name, address, phone, price, comment, facilities
            })
            await imagesUpload(files, 'image-hotel', data);

            res.json({
                status: 'ok',
                data,
            })
        } catch (e) {
            next(e)
        }
    };
    static getHotelById = async (req,res,next) => {
        try {
            const {hotelId} = req.body;
            const hotel = await Hotels.findOne({
                where: {
                    id: hotelId
                }
            });

            res.json({
                status: 'ok',
                hotel
            })
        }catch (e) {
            next(e);
        }
    };
    //todo
    static updateHotel = async (req, res, next) => {
        try {
            await validate(req.body, {
                name: 'required|string|min:3',
                address: 'required|string',
                price: 'required|string',
                phone: 'required|phone',
                comment: 'required|string',
                facilities: 'required|string',
            });
            const {name, address, phone, price, comment, facilities} = req.body;
            const {files} = req;
            const {hotelId} = req.params;

            if (!hotelId) {
                throw HttpError(404, 'This Sightseeing Not Found')
            }
            if(!files){
                const data = await Hotels.update(
                    {name, address, phone, price, comment, facilities},
                    {
                        where: {
                            id: hotelId
                        }
                    });
                const updatedHotel = await Hotels.findOne({
                    where: {
                        id: hotelId
                    }
                })

                res.json({
                    status: 'ok',
                    updatedHotel
                })
            }
            const data = await Hotels.update(
                {name, address, phone, price, comment, facilities},
                {
                    where: {
                        id: hotelId
                    }
                });
            await imagesUpload(files, 'image-sightseeing', data);

            const updatedHotel = await Hotels.findOne({
                where: {
                    id: hotelId
                }
            })

            res.json({
                status: 'ok',
                updatedHotel
            })
        } catch (e) {
            next(e);
        }
    }
}

export default HotelsController;