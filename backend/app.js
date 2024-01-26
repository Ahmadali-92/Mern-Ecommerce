const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
let dotenv = require("dotenv");

//Middleware Error Import
const errorMiddleware = require("./middleware/error");

dotenv.config({ path: "backend/config/config.env" });

//app.use('/api/v1',product) is ko use krny k liya command
app.use(express.json());
app.use(cookieParser());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb', extended: true ,parameterLimit:50000}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
let payment = require("./routes/paymentRoute");

//Routes (ENd-Points)
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
