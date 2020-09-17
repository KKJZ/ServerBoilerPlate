const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const morgan = require("morgan");

const passport = require("./passport/setup");

require("dotenv").config();
const { PORT, DATABASE_URL, SESSION_SECRET } = require("./.config");

const app = express();

// Routers TODO: Add Routes
const authRouter = require("./route/authRouter");
const apiRouter = require("./route/apiRouter");

// Logging
app.use(morgan("common"));

// TODO: Once Gatsby is setup
// express.static(root, [options]);

// mongoose setup
mongoose
    .connect(DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(console.log(`MongoDB connected ${DATABASE_URL}`))
    .catch(err => console.error(err));

// Before Json routes
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/api", apiRouter);


// Startup
let server;

function runServer(port = PORT) {
    server = app.listen(port, () => {
        console.log(`Server is listening on PORT: ${port}`);
    });
}

function closeServer() {
    console.log("Closing Server");
    server.close(err => {
        if (err) {
        }
    });
}

if (require.main === module) {
    runServer();//.catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
