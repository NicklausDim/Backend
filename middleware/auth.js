const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

exports.checkAuth = ( req, res, next ) => {
    const token = req.header('x-auth-token');

    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {

        if (!token) {
            res.status(401).send({status: 'failed', message: 'Absent token'});
        } else {

            try {
                jwt.verify(token, jwtSKey, (fail, decodedPayload) => {
                    if (fail) {
                        console.log(2);
                        res.status(401).send({status: 'failed', message: 'Invalid token'});
                    } else {
                        req.userId = decodedPayload.id;
                        console.log(3);
                        next();
                    }
                });
            } catch(err) {
                // err
            }
        }
    }
}