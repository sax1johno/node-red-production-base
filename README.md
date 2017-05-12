Node-RED Docker Base
=======
This is a docker container that makes administering Node-RED much simpler.  It provides several features of the standard base container, including the following:
* Configuration changes can be made via Environment Variable
* Built-in MongoDB storage module (and more in the future)
* A "workspace" volume for mounting files into your Node-RED instance (including configuration files)
* Automatically serves static content from a "public" folder in the "workspace" so you can expose resources publicly if you choose to.
* Many more improvements.

# Configuring Node-RED
Configuration can be done in 2 ways - you can either mount the "workspace" volume and edit the "settings.js" file directly, or you can configure the pre-defined settings using environment variables.

Below is a list of the environment variables you can use to configure the base instance:

| Variable  | Default           | Possible Options  | Short Description |
| ------------- |:-------------:| -----:| ------:|
| APP_NAME      | myapp | Any string | Gives your application a name in the system.  Used to generate default flow file names and other funn stuff.
| APP_VERSION      | 0.0.1      |   <major>.<minor>.<patch> | Allows you to specify a version number for your application.  Useful when debugging.
| HTTP_ADMIN_ROOT | /system/admin      |    Any valid absolute path name | Specify which path the flow editor will be served from
| HTTP_NODE_ROOT | /      |    Any valid absolute path name | Specify which path will the the base path for all URL's specified in a Node-RED node.
| ADMIN_USERNAME | admin      |    any valid unix username | The admin username you'll use to log into the system (uses basic auth)
| ADMIN_PASSWORD | (null - you should always set this)      |    Any Valid Password | Sets the  admin password for your login
| LOG_LEVEL | debug      |   [fatal\|error\| warn\|info\|debug\|trace\|]  | Specify how granular you want the logs to be
| LOG_METRICS | false      |   [true\|false] | If true, logs out metrics data as well as the given log level data
| LOG_AUDIT | false     |    [true\|false] | if true, logs out audit trail data as well as the given log info.
| FLOW_NAME | $APP_NAME     |    Any valid string  | Provides the name for the flow file if using flat-file / JSON storage to store your flows
| MONGO_APPNAME | $APP_NAME     |    Any valid string | Gives a name to this application in MongoDB. Allows you to store multiple node-red flows within the same MongoDB collection.
| MONGO_COLLECTION | ${APP_NAME}_flows     |    Any valid MongoDB collection name | Specifies which MongoDB collection to store the flows in for this application.  Defaults to the name of your application with _flows afterward, so by default all applications store their flows in a different collection. 
| MONGO_DATABASE_URL | mongodb://db/ |    Any valid MongoDB connection string | Specifies a connection string for connecting to MongoDB.  By default, assumes there is a linked container with a service called "db" running MongoDB.  This can be changed to any valid MongoDB database connection string, and can be used with ?ssl and ?replset options.

# LICENSE
MIT License (see LICENSE file for detials).  Copyright (C) 2017, John O'Connor



