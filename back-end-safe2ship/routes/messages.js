const express = require('express');
const router = express.Router();

module.exports = ({
    postMessage,
    editMessage,
    deleteMessage
}) => {
  
    router.post('/msgs', (req, res) => {
        postMessage(req.body)
            .then((users) => {
                // websocket to update recipient
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    
    
    router.patch('/msgs', (req, res) => {
        editMessage(req.body)
            .then((users) => {
                // websocket to update recipient
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    
    
    router.delete('/msgs', (req, res) => {
        deleteMessage(req.body)
            .then((users) => {
                // websocket to update recipient
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });


    return router;
};
