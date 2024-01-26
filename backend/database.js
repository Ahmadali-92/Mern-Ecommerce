const mongoose = require("mongoose");

let connectDatabase = () => {
  // try {
  //   await mongoose.connect(process.env.DB_URI);
  //   console.log(`Mongodb connected with the server`);
  // } catch (err) {
  //   console.log(err.message);
  // }
  mongoose.connect(process.env.DB_URI).then(()=>{
    console.log(`Mongodb connected with the server`);
  })
};
module.exports = connectDatabase;
