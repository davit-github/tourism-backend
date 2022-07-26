import {Images} from "../models";


class ImagesController {
    static getImageById = async (req, res, next) => {
        try {
            const {imageId} = req.body;
            const image = await Images.findOne({
                where: {
                    id: imageId
                }
            });

            res.json({
                status: 'ok',
                image
            })
        } catch (e) {
            next(e)
        }
    }
}

export default ImagesController;