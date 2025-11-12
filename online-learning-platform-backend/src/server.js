import app from "./app.js"
import mongoose from 'mongoose';

const port = 3000

const main = async() =>{
    try{
        await mongoose.connect("mongodb+srv://arfan18:QSY86AS.at37nc9@cluster0.zfaaptg.mongodb.net/online-learning-platform?appName=Cluster0")
    }catch(err){
        console.log("Database connection failed", err);
    }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main()