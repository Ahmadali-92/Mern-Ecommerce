const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
// let connectDatabase=require('./config/database.js')
let connectDatabase = require("./database.js");

//Handling Uncaught Expection,console.log(ahmad)->aysy error k liya
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Handling Uncaught Expection");
  process.exit(1);
});

//config path(Environment variable).OR jo jo cheezy env se connect h nichy wali line k bad hi call kro
dotenv.config({ path: "backend/config/config.env" });
//connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

const startServer = app.listen(process.env.PORT, () => {
  console.log(
    `The port listening on successfully http://localhost:${process.env.PORT}`
  );
});

//Unhandled Promise Rejection(srever crash na ho jay is ki jaga ya kr do,jo alto falto error aty hn wo ni ay gy lamby waly us ki jaga server band ho jay ga).databse ma try catch ki zarorat ni pry gi
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  //let close the server
  startServer.close(() => {
    process.exit(1);
  });
});
