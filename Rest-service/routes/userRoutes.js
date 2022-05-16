const router = require('express').Router(); //importing express module's router to handle server calls
const uuid = require('uuid'); // importing uuid module
const User = require('../models/userModel'); // importing user model based on mongoose schema
const jsonwebtoken = require('jsonwebtoken');
const passwordHash = require('password-hash');

// get users
router.get('/',(req,res)=>{
    User.find((err,docs)=>{ //using the User schema's find funcion to find all the docs in user collection
        res.json(docs); //setting the response with retrieved docs
    })
});

// get user by id
router.get('/:id',(req,res)=>{
    User.findOne({
        id: req.params.id   //getting the id param from the request to filter by id    
    }).then((u) => {
    res.json(u);
    }).catch((err) => res.json("Error:" + err));
});

// add user
router.post('/',(req,res)=>{
    req.body.id = uuid.v4(); //using uuid to generate unique user id and set it to the request body
    const user = new User(req.body); //creating a new user object with the request body
    const token = jsonwebtoken.sign({ //creating json Web Token with required details for user management
        id: user.id,
        email: user.email,
        type: user.type,
        phone: user.phoneNumber,
        address: user.address
    }, "jwtSecret")

    User.findOne({
        email: user.email //finding the user by email
    }).then((u)=>{
        if(u){
            res.json("ALREADY_EXISTS");
        }
        else{
            user.save().then((u) => {
                res.json({token, u});
            })
            .catch((err)=>{
                res.json(err);
            })}
        }
    ).catch((err)=>{
        res.json(err);
    });
})

// modify user
router.put('/:id',(req,res)=>{
    User.findOneAndUpdate( //using find one and update to find a relevant doc and update it with new data
    {
        id: req.params.id
    },
    {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address:req.body.address,
        type: req.body.type,
        email: req.body.email,
        password: passwordHash.generate(req.body.Newpassword)
    }).then((u)=>{
        User.findOne({
            id: req.params.id
        }).then((newUser) => {
            const token = jsonwebtoken.sign({
                id: newUser.id,
                email: newUser.email,
                type: newUser.type,
                phone: newUser.phoneNumber,
                address: newUser.address
            }, "jwtSecret")
            console.log(token,newUser)
            res.json({token,newUser});
        })
    }).catch((err)=>{
        console.log(err);
        res.json(err);
    })
});

// delete user
router.delete('/:id',(req,res)=>{
    User.findOneAndRemove(
    {
        id: req.params.id
    }).then((u)=>{
        console.log(u)
        res.json(u);
    }).catch((err)=>{
        console.log(err);
        res.json(err);
    })
});

// login user by email
router.post('/:email',(req,res)=>{
    User.findOne({
        email: req.body.email
    }).then(user=>{
        if(user){
        if(passwordHash.verify(req.body.password,user.password)){
            const token = jsonwebtoken.sign({
                id: user.id,
                email: user.email,
                type: user.type,
                phone: user.phoneNumber,
                address: user.address
            }, "jwtSecret")
            res.json({token});
        }
        else{
            res.send("AUTHERROR");
        }
        }
        else
            res.send("AUTHERROR");

    })
});

module.exports = router; //exporting the configured router object
