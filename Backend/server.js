import express from 'express';
import mongoose from 'mongoose';
import authRoutes from "./Routes/authRoutes.js"
const app = express();
const port=5100;
try{
    await mongoose.connect('mongodb://localhost:27017')
    app.listen(port, ()=>{
      console.log(`server running on PORT ${port}...`);
    });
  }catch(error){
    console.log(error);
    process.exit(1);
}
app.get('/', (req,res) =>{
    res.send('Hello World');
});

app.use('/api/auth', authRoutes);