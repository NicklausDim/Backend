exports.test = ( req, res, next ) => {
    console.log('Middleware started!\n', req.body, 'Middleware finished');
    //....Some Validations goes here...
    req.body.isValid = true;
    if (req.body.isValid) {
        next();
    } else {
        res.status(401).send({status:'failed', message: 'Request is not valid'});
    }
    //next();
}