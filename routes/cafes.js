import express from 'express';
import CafesController from '../controllers/CafesController';
import upload from "../services/fileUpload";

const router = express.Router();

router.get('/getAllCafes', CafesController.getAllCafes);
router.post('/addCafe', upload.array('images[]'), CafesController.addCafe);
router.get('/getCafeById', CafesController.getCafeById);
//todo
router.put('/updateCafe', upload.array('images[]'), CafesController.updateCafe);


export default router;
