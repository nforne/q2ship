const express = require('express');
const router = express.Router();


module.exports = ({
    postPackage,
    editPackage,
    deletePackage,
    getPackageMsgs,
    postPackageMsgs
}) => {
   
    router.post('/pkgs/create', (req, res) => {
        console.log(req.body) //---------------------------------
        postPackage(req.body)
            .then((pkgs) => {
                res.json(pkgs);
            })
            .catch((err) => {
                console.log('this error ===>', err) //-----------------------------------
                res.json({error: err.message})
            });
    });

    router.patch('/pkgs/update', (req, res) => {
        const {id, customer_id} = req.body;

        editPackage(id, customer_id)
            .then(pkgs => {
                res.json(pkgs);
                //websocket pkg messages update users
                //update users if in order and deleting
            })
            .catch(err => res.json({
                error: err.message
            }));
    })
    
    
    router.delete('/pkgs/delete', (req, res) => {
        const {id, customer_id} = req.body;
        
        deletePackage(id, customer_id)
            .then(pkgs => {
                res.json(pkgs);
                //websocket pkg messages update users
                //update users if in order and deleting
            })
            .catch(err => res.json({
                error: err.message
            }));

    })
    
    
    router.post('/api/pkgs/message', (req, res) => {
        console.log(req.body) // {pkgId:props.listpkg.id, customer_id: props.listpkg.customer_id, shipper_id:props.user[0].id, message: `Hello!, Please, I would like to move your package... #${props.listpkg.id}`}
        const {id, customer_id} = req.body;
        
        postPackageMsgs(req.body.pkgId, req.body)
            .then(pkgs => {
                res.json(pkgs);
                //websocket pkg messages update users
                //update users if in order and deleting
            })
            .catch(err => res.json({
                error: err.message
            }));

    })
    
    
    router.post('/api/pkgs/poll', (req, res) => { // req : {list: packagesInOrdreCart }
        console.log(req.body) // {pkgId:props.listpkg.id, customer_id: props.listpkg.customer_id, shipper_id:props.user[0].id, message: `Hello!, Please, I would like to move your package... #${props.listpkg.id}`}
        const {id, customer_id} = req.body; 
        
        getPackageMsgs(req.body.pkgId, req.body)
            .then(pkgs => {   // res.data === {id:** , messages:[{}]} send only if there is a reply messages.length? 
                res.json(pkgs);
                //websocket pkg messages update users
                //update users if in order and deleting
            })
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};

