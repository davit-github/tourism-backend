import multer from "multer2";
import {imageValidator} from "./imageValidator";
import HttpErrors from "http-errors";

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (imageValidator.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(HttpErrors(422, "Please upload only image file"), false);
        }
        cb(null, true)
    }
})

export default upload;