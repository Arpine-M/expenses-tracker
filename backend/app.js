require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
// Cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
    
}
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);


// Error
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
