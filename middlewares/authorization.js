import HttpErrors from 'http-errors';
import jwt from 'jsonwebtoken';

const exclude = [
  'POST:/users/login',
  'POST:/users/register',
  'GET:/users/accountMe',
  'PUT:/users/update',
  'DELETE:/users/delete',
  'POST:/cafes/addCafe',
  'GET:/cafes/getCafeById',
  'PUT:/cafes/updateCafe',
  'PUT:/sightseeing/addSightseeing',
  'POST:/sightseeing/updateSightseeing',
  'POST:/hotels/addHotel',
];

function authorization(req, res, next) {
  try {
    const { originalUrl, method } = req;
    if (method === 'OPTIONS' || exclude.includes(`${method}:${originalUrl.replace(/\?.*/, '')}`)) {
      next();
      return;
    }
    const { authorization } = req.headers;
    let userId;
    try {
      const { JWT_SECRET } = process.env;
      const data = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET);
      userId = data.userId;
    } catch (e) {
      next(e);
    }
    if (!userId) {
      throw HttpErrors(401);
    }
    req.userId = userId;

    next();
  } catch (e) {
    next(e);
  }
}

export default authorization;
