import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.URI;

async function main() {
    mongoose.connect(url)
    .then(() => console.log('MongoDB is up and running'))
    .catch(error => console.error('Connection failed', error))
}

export default main;