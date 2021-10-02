const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

const app = express();

const { Cors, errorHandler } = require('./utils/middlewares');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

const config = require('./utils/config');

dotenv.config();

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use(Cors);

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    autoIndex: false

})
    .then(() => {
        console.log("Connected to the DB")

    })
    .catch((error) => {
        console.log({ error: error })
    })

    app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`);
})