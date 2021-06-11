const logModel = require('../model/logs')

exports.logger = ( req, res, next ) => {
 
    const log = new logModel({
        dateTime: Date.now(),
        path: req.originalUrl
    });

    log.save((err, doc) => {
        console.log(err);
        if(err) {
            res.status(500).send({status:'failed', message:'Please try again', data:err.errors});
        } else {
            //res.send(docs);
            req.logId = doc._id;
            next();
        }
    });
}