const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/',verifyToken, (req, res)=>{
    // res.json(
    //     {
    //         posts:{
    //             title: 'my first post',
    //             description: 'Random description'
    //         }
    //     })
    res.send(req.user);

})

module.exports = router;