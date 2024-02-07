const express=require("express");
const app=express();
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
app.use(express.json());  
app.use(cors());
const authRoute=require("./routes/auth");
const productRoute=require("./routes/product");
const cartRoute=require("./routes/cart");
const userRoute=require("./routes/user");
const orderRoute=require("./routes/order"); 
const stripeRoute = require("./routes/stripe");
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute); 
app.use("/api/users",userRoute);
app.use("/",orderRoute);
app.use("/api/checkout", stripeRoute); 
  

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


  app.get("/",(req,res)=>
  {
    res.send("working");

  })

  app.listen(5000,()=>
  {
    console.log("server started");
  })

