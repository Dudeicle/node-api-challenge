// import dependencies
const express = require("express");
const helmet = require("helmet");

// import routers
const projectsRouters = require("./apiRouters/projects-route");

// not sure
const server = express();

//Global Middleware
server.use(express.json());
server.use(helmet());

// Telling server to use the endpoint within actionRouters/projectRouters after /api
server.use("/api", projectsRouters);

// the starting end point of just / - should see this when first opening page
server.get("/", (req, res) => {
	res.send(`<h2>Let's write this Sprint Code!</h2>`);
});

module.exports = server;
