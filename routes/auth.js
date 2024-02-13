const router = require("express").Router();
const User = require("../models/User");


//REGISTER
router.post("/register", async (req, res) => {
  const {username,password}=req.body;
  try
  {
    const rep=await User.findOne({username});
    if(rep)
    {
      res.json({msg:"user already registered"});
    }
    else
    { 
      const res=await User.create({username,password});
      if(res)
      {
        res.json({msg:"user registation success"});
      }
    }

     }
 
  catch(err)
  {
    res.send(err);
  }


})



//LOGIN

router.post('/login', async (req, res) => {
    const{username,password}=req.body;
    try {
        
        const user=await User.findOne({username});
        if(!user)
        {
            res.json({msg:"user not found"});
        } 
        else{
            if(password==user.password) 
            {
                res.json({msg:"user logged in"})
            }
            else
            {
                res.json({msg:"password is incorrect"}) 
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports=router;
  
