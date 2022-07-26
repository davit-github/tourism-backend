import express from 'express';
import UsersController from '../controllers/UsersController';
import upload from "../services/fileUpload";

const router = express.Router();

router.post('/register',UsersController.register);
router.post('/login', UsersController.login);
router.get('/accountMe/:userId', UsersController.accountMe);
router.put('/update/:userId',  upload.single('image'),  UsersController.update);
router.delete('/delete/:userId', UsersController.delete);


export default router;
