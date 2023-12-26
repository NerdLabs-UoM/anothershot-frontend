// import mongoose, { ConnectOptions } from 'mongoose';

// const connectDB = async () => {

//     if (mongoose.connections[0].readyState) {
//         return;
//     }

//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URL as string, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         } as ConnectOptions);
//         console.log(`MongoDB Connected: ${connection.connection.host}`);
//     } catch (error: any) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// }

// export default connectDB;