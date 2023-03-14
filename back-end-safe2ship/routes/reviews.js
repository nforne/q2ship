const express = require('express');
const router = express.Router();

module.exports = ({
    updateRating,
}) => {

    router.patch('/rate', (req, res) => {
        
        updateRating(req.body)
            .then((user) => {
                // websocket update reviewd user
            })
            .catch(err => err);
       
    })

    return router;
};
