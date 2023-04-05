const mongoose = require('mongoose');


const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.CONNECTION_URL)
        // , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        process.exit(1);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    }
    catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
    }
}

module.exports = connectDb;