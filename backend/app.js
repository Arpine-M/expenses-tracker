require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/', userRouter);

// Error
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
