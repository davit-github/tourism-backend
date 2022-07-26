import express from 'express';
import HotelsController from '../controllers/HotelsController';
import upload from "../services/fileUpload";

const router = express.Router();

router.get('getAllHotels', HotelsController.getAllHotels);
router.post('addHotel', upload.array('images[]'), HotelsController.addHotel);
router.get('/getHotelById', HotelsController.getHotelById)
//todo
router.put('/updateHotel', HotelsController.updateHotel);

export default router;
