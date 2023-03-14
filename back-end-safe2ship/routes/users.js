const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// ----------------## Routes userGET-----------------------------------------------

module.exports = ({
    getUserByEmail,
    getPackagesById,
    getOrdersById,
    getSystem_ids,
    getPackagesInqueue,
    postUser,
    getUserBySystem_id,
    getUserById
}) => {
   
// ----------------------------## Routes userGET----------------------------------
    router.post('/users/signin', (req, res) => {
        
        if (req.body.email === '' || req.body.email.split('').includes(' ')) res.json({error: "Incorrect email", code: "xe"});
        if (req.body.password === '' || req.body.password.split('').includes(' ')) res.json({error: "Incorrect password", code: "xpw"});
        
        getUserByEmail(req.body.email)
            .then((user) => {
                user.length !== 0 ? console.log(JSON.stringify(user)) : console.log('=> this sign-in fail ...'); //------------------------------------------
                if (user.length !== 0 && user[0].status !== 'deleted' && bcrypt.compareSync(req.body.password, user[0].password)) {
                    req.session.user_id = user[0]['system_id'];
                    
                    let userInfo = {"user": user}
                // ---------------------------------------------------------------------
                    
                    Promise.all([
                        user[0].status === 'customer'? getPackagesById(user[0].id): getPackagesInqueue(),
                        getOrdersById(user[0].id)
                    ]).then((all) => {
                        userInfo["packages"] = all[0];
                        userInfo["orders"] = all[1];
                        res.json(userInfo)
                    })

                // ---------------------------------------------------------------------

                } else if (user.length !== 0 && user[0].status === 'deleted' || user.length === 0){
                    res.json({error: "The requested account does not exist. Please go to Sign-Up!", code: "xac"})
                } else {
                    res.json({error: "incorrect passward", code: "xpw"})
                }
                
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

// ----------------------------## Routes userPOST-----------------------------

    router.post('/users/signup', (req, res) => {

        if (req.body.name === '') res.json({error: 'Enter your full name, please!', code: "xname"});
        if (req.body.phone === '' || req.body.phone.split('').includes(' ')) res.json({error: 'Enter your phone number, without spaces, please!', code: "xp#"});
        if (req.body.email === '' || req.body.email.split('').includes(' ')) res.json({error: 'Enter your email, without spaces, please!', code: "xe"});
        if (req.body.password === '' || req.body.password.split('').includes(' ')) res.json({error: 'Enter a password, without spaces, please!', code: "xpw"});
        if (req.body.address === '' ) res.json({error: 'Enter your address, without spaces, please!', code: "xAdrs"});
        if (req.body.bio === '' ) res.json({error: 'Enter a sentence or more about who you are, please!', code: "xbio"});
        if (req.body.satus === '' ) res.json({error: 'Stop messing with the system!', code: "xsm"});

        const { email } = req.body;

        getUserByEmail(email)
            .then(user => {
                if (user.length !== 0) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists. Try another'
                    });
                } else {
                    return postUser(req.body)
                }
            })
            .then(newUser => {
                req.session.user_id = newUser.user[0].system_id;
                res.json(newUser);
            })
            .catch(err => res.json({
                error: err.message
            }));

    })

// ----------------------------## Routes userLogout-----------------------------
        router.post('/users/logout', (req, res) => {
            req.session.user_id = req.body.system_id;
            res.json({message: 'bye 4 now!'})
        });

// ----------------------------## Routes userPATCH-----------------------------
    router.post('/users/update', (req, res) => {
        const { email } = req.body;
            updateUser(req.body)
                .then(newUser => res.json(newUser))
                .catch(err => {
                    res.json({error: err.message})
                })     
    });

    
// ----------------------------## Routes userPUT-----------------------------
    router.post('/users/upgrade', (req, res) => {
        upgradeUser(req.body)
            .then(newUser => {
                req.body['status'] === 'shipper' ? req.body['status'] = 'customer' : req.body['status'] = 'shipper';
                deleteUserByStatus(req.body); // soft delete
                res.json(newUser);
            })
            .catch(err => {
                res.json({error: err.message})
            })

        const { email } = req.body;
        // getUserByEmail(email)
        //     .then(user => 
        //         {return user.rows;}
        //     ) 
        //     .catch(err => {
        //         res.json({error: err.message})
        //     }) 
    });


// ----------------------------## Routes userDELETE-----------------------------
    router.delete('/users/delete', (req, res) => {
        deleteUserByStatus(req.body) // soft delete
            .catch(err => {
                res.json({error: err.message})
            }) 
    });




// ----------------------------## Routes getOtherUser-----------------------------
    router.post('/users/other', (req, res) => {
        getUserById(req.body.id)
            .then(otherUser => {
                console.log(otherUser) //----------------------------
                const { 
                    name,
                    phone,
                    email,
                    photo,
                    address,
                    number_of_orders,
                    number_of_packages,
                    rating_sum,
                    bio,
                    status,
                    system_id,
                    web_link,
                    work_schedule,
                    time_created 
                } = otherUser[0];
                if (otherUser[0].status !== 'deleted') {  
                    res.json({ 
                        name,
                        phone,
                        email,
                        photo,
                        address,
                        number_of_orders,
                        number_of_packages,
                        rating_sum,
                        bio,
                        status,
                        system_id,
                        web_link,
                        work_schedule,
                        time_created 
                    })
                } else {
                    res.json({msg: 'Oops! Sorry, the requested user does not exist!'}) 
                }
            })
            .catch(err => {
                res.json({error: err.message})
            }) 
    });

    return router;
};

// const express = require('express');
// const router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
