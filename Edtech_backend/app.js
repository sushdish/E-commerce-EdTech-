//Run the Project with npm start



require('dotenv').config()                  // Importing .dotenv package for env 
// Importing Pacakages / library  
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const tagRoutes = require("./routes/tag");
const userLogsRoutes = require("./routes/userlogs")
const userEnrollmentRoutes = require("./routes/userEnrollment")


// PORT Connections 
const port = process.env.PORT ||  7000;        

const app = express();

// DB connections 
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(()=>{
        console.log("DB is connected")
    }).catch();
    
// MiddleWare     
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Method for Time 
const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };
  
  
  //Logging Http Requests and Status Code and Url and time 
  const Https_request = (req, res, next) => {
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = {"Method":  `${method}`,  
                "Url":   `${url}`,
                "Status Code":  `${status}`,
                "TimeTaken" : `${(durationInMilliseconds.toLocaleString() + "ms")}`};
     //Logging the data 
    // req.log = log;
    console.log(log)
    next();
  };

// Routes 
app.use("/api", Https_request,authRoutes);
app.use("/api",Https_request,  userRoutes);
app.use("/api",Https_request, categoryRoutes);
app.use("/api", Https_request, courseRoutes);
app.use("/api",Https_request,tagRoutes);
app.use("/api",Https_request, userLogsRoutes);
app.use("/api",Https_request, userEnrollmentRoutes);





// Server is Running 
app.listen(port, () => {
    console.log(`Server is running ${port} port`)
})