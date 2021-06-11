const users = require('../model/users');
const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

const bcrypt = require('bcrypt');

exports.registerPost = async (req, res) => {
/* 
    const email = req.body.email;
    const pass = req.body.pass;
    const {email, pass} = req.body;
    const newUser = new users({email, pass});
 */
    

    let {email, pass} = req.body;

    pass = await bcrypt.hash(pass, 10);

    const newUser = new users({email, pass});

    users.findOne({email:req.body.email}, (err, doc) => {
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else if(doc !== null) {
            res.status(406).send(({status:'failed', message: 'Please try different email!'}));
        } else {
            newUser.save((err, doc)=>{
                if (err) {
                    console.log(err);
                    res.send({status:'failed', message: err});
                } else {
                    console.log(doc);
                    res.send(({status:'success', message: 'The account is created successfully'}));
                }
            });
        }
    });

}


exports.loginPost =  (req,res) => {

    let {email, pass} = req.body;

    users.findOne({email}, async (err, doc) => {
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else if(doc == null) {
            res.status(406).send(({status:'failed', message: 'Wrong credentials!'}));
        } else {
            const match = await bcrypt.compare(pass, doc.pass);

            if(match)  {
                //Create the token and send to FE
                const token = jwt.sign({id:doc._id}, jwtSKey, {expiresIn: '1d'});
                console.log(doc);
                res.send(({status:'success', message: 'User logged in successfully', token}));
            } else {
                res.send({status:'failed', message: `There's an error, please try again later.`});
            }
        }
    })
}