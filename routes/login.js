const express=require('express');

const router=express.Router();


router.get('/',(req, res, next)=>{
    res.send('<form action="/validate" method="POST"><input type="text" name="username"><button type="submit">Login</button></form>')
})
router.post('/validate',(req, res, next)=>{
    const { username } = req.body;
    req.session.username = username;
    res.redirect('/chat');
})

module.exports=router;