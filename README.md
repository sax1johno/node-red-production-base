# Build Instructions

To build for development, use the following:
`docker-compose build`

and to run

`docker-compose run -d`

# For Production
To build for production, use the following:
`docker-compose build -f docker-compose.yml -d`

# Scaling
To scale up any of the services, use the docker-compose scale command
`docker-compose scale node-red=2 service_2=3`
