/**
 * This is an express-powered node-red application bootstrap.  This spins
 * up the node-red server and allows us to use more precise settings control.
 **/
var http = require('http');
var express = require("express");
var RED = require("node-red"),
    app = express(),
    environment = app.settings.env;

var config = require("./config/config.js");
app.use("/",express.static("/usr/src/workspace/public"));

// Create a server
var server = http.createServer(app);

var redConfig = config.nodered();
console.log("userDir = ", redConfig.userDir);

// Initialise the runtime with a server and settings
console.log("Node red config = ", redConfig);
RED.init(server,redConfig);

// Serve the editor UI from /red
if (redConfig.httpAdminRoot) {
    app.use(redConfig.httpAdminRoot,RED.httpAdmin);
}

// Serve the http nodes UI from /api
app.use(redConfig.httpNodeRoot,RED.httpNode);

server.listen(config.main.port);
console.log("Listening on port ", config.main.port);
// Start the runtime
RED.start();
