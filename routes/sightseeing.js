import express from 'express';
import SightseeingController from '../controllers/SightseeingController';
import upload from "../services/fileUpload";

const router = express.Router();

router.get('/getAllSightseeing', SightseeingController.getAllSightseeing);
router.post('/addSightseeing',  upload.array('images[]'),SightseeingController.addSightseeing);
router.get('/getSightseeingById', SightseeingController.getSightseeingById);
//todo
router.put('/updateSightseeing/:sightseeingId', SightseeingController.updateSightseeing);
export default router;
