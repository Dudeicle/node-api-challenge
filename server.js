// import dependencies
const express = require("express");
const helmet = require("helmet");

// import routers
const projectRouter = require("./routers/projectRouters");

// not sure
const server = express();

//Global Middleware
server.use(express.json());
server.use(helmet());

// Telling server to use the endpoint within projectRouter after /api
server.use("/api", projectRouter);

// the starting end point of just / - should see this when first opening page
server.get("/", (req, res) => {
	res.send(`<h2>Let's write this Sprint Code!</h2>`);
});

module.exports = server;
