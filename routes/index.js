import express from 'express';
import users from './users';
import hotels from "./hotels";
import cafes from "./cafes";
import sightseeing from "./sightseeing";
import images from "./images";

const router = express.Router();

router.get('/',  (req, res, next) => {
  res.json({
    status: "ok"
  });
});


router.use('/users', users);
router.use('/hotels', hotels);
router.use('/cafes', cafes);
router.use('/sightseeing', sightseeing);
router.use('/images', images);

export default router;
