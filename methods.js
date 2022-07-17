const express = require("express");

const app = express();

// ears of server
// app.listen(3000, () => {
//     console.log("Methods file running on Port 3000.");
// });

// middleware function -> works on post, converts incoming frontend data to json
app.use(express.json());  // global middleware function
app.use(express.urlencoded({ extended: true }));

// users array for /users
let users = [
    {
        id: 1,
        name: "Hardik",
    },
    {
        id: 2,
        name: "Nikhil",
    },
    {
        id: 3,
        name: "Abhinav",
    },
];

// MiniApp for /user
const userRouter = express.Router(); // creating instance of Router
// base route, router to use
app.use("/user", userRouter);

userRouter
    .route("/") // final route after base route eg.) /user/
    .get(getUser)    // all these are path specific middleware
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route("/:id") // final route = /user/1
    .get(getUserById);


// Miniapp for /auth
const authRouter = express.Router();
// base route
app.use("/auth", authRouter);

authRouter
    .route("/signup") // matching route
    .get(middleware1, getSignUp, middleware2)   // adding a middleware 
    .post(postSignUp);

// get request
// app.get("/user/", getUser);

// post request
// app.post("/user", postUser);

// update request -> patch
// app.patch("/user", updateUser);

// delete request -> to delete data
// app.delete("/user", deleteUser);

// Parameters
// app.get("/user/:username", (req, res) => {
//     console.log(req.params.username);
//     res.json(req.params);
// })

// Query -> ?key1=value1&key2=value2
// app.get("/user", (req, res) => {
//     console.log(req.query)

//     res.send(users)
// })

// Users CRUD functions

function getUser(req, res) {
    //   console.log(req.params.username);
    //   res.json(req.params);
    res.send(users);
}

function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "message received successfully",
        user: req.body,
    });
}

function updateUser(req, res) {
    console.log("req.body -> ", req.body);
    // update data in users object
    const dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }

    res.json({
        message: "data updated successfully",
    });
}

function deleteUser(req, res) {
    users = {};
    res.json({
        message: "data has been deleted",
    });
}

function getUserById(req, res) {
    console.log(req.params.id);
    let paramId = req.params.id; //parseInt(req.params.id);
    let obj = {};
    for (index in users) {
        if (users[index]["id"] == paramId) {
            obj = users[index];
        }
    }
    res.json({
        message: "user id validated",
        data: obj,
    });
}

// middleware functions

function middleware1(req, res, next) {
    console.log("middleware1 encountered.");
    next();
}

function middleware2(req, res) {
    console.log("middleware2 encountered.");
    // next();
    console.log("middleware2 ended req/res cycle.");
    res.sendFile("/public/index.html", { root: __dirname });
}

// Sign Up functions

// function getSignUp(req, res) {
//     res.sendFile("/public/index.html", { root: __dirname });
// }

function getSignUp(req, res, next) {
    console.log("getSignUp called.");
    // res.sendFile("/public/index.html", { root: __dirname });
    next();
}

function postSignUp(req, res) {
    let obj = req.body;
    console.log("backend", obj);
    res.json({
        message: "user signed up",
        data: obj,
    });
}

module.exports = { userRouter, authRouter};