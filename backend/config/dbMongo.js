import mongoose from "mongoose";

const connectMongoDB = (mongoURI, dbName) =>{
    mongoose
    .connect(mongoURI,{dbName:dbName})
    .then(() => console.log('connecxion a mongo reussi'))
    .catch(console.error( () => console.log('error')))
}
export default connectMongoDB