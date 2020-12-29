import mongoose from "mongoose"

const connect = async () => {
    try{
        await mongoose.connect("mongodb://localhost/productsdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("DB is connected")
    }catch(ex){
        throw "DB could not be connected"
    }
}

connect()

