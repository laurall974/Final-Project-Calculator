# Final Project - Calculator - Cloud Computing  
## :star2: Goal
Create a calculator container that connects to a mongodb which runs on another container, fetches data and shows it on a webpage on your host machine.

Add to your application a feature, which adds the images on your host and loads it on a web page. Any changes in this folder should be shown by refreshing the web page. (by using a bind mount) 

Explain how you can migrate it! How to share it with another instance of the same database engine.

## :construction_worker_woman: Prerequisites
Be sure to have docker and docker compose installed, check with
```
docker --version
docker-compose --version
```

## :scissors: Fork the repository
And then clone it, go to the directory with:
```
git clone git@github.com:<your_github_username>/<project-name>.git
cd <project-name>
```

## :chart_with_downwards_trend: Without Docker compose
1. Pull the docker images (python, mongo)
```
docker pull mongo
docker pull node
```
It will pull the latest version as the default one without giving a tag, if you dont have it already.

2. Create a bridge network for the containers to connect to!
```
docker network create --driver bridge <your_bridge_network_name>
```

3. Start the MongoDB container by specifying the network and the port
```
docker run -d --network <your_bridge_network_name> --name <your_mongo_container_name> -p 27017 mongo
```

4. Build the Docker image for the Flask application
```
docker build -t <your_new_image_name> .
```

5. Create the docker Volume
```
docker volume create <your_volume_name>
```

6. Start the Calculator container, specifying the network, bind mount, volume
```
docker run -d 
  --network <your_bridge_network_name> 
  --name <your_new_container_name> 
  -p 8080:8080 
  -v /path_to_your_directory/<project-name>/Pictures:/app/images <your_new_image_name> 
  -v <your_volume_name>:/data/db mongo 
```

## :chart_with_upwards_trend: With Docker compose
Use the command
```
docker compose up -d
```
## :rocket: Let's go
The list of calculations is available on [http://localhost:8080](http://localhost:8080), you can go to [/calculator](http://localhost:8080/text) endpoint to do the calculations on the calculator app. Any changes in the Pictures folder will be shown by refreshing the web page [http://localhost:8080](http://localhost:8080).

You can also verify mounts : 
```
docker inspect <your_mongo_container_name>
```
## User Stories ( :heavy_check_mark: : implemented features)
Your Project should have:
- At least two containers, one being a database of your choice
- At least one well-documented Dockerfile and docker-compose.yml (with comments)
- A volume to make your database persistent and also a bind mount
- An explicit bridge network for the communications of your containers
- A Docker Hub public repository for your docker images
- A GitHub repository with instructions to run your project (The collaboration of
both contributors should be visible)
- At least a dependency requiring the installation of an external library/package

You have 10 minutes to present your project (7 minutes of presentation and 3 minutes
Q&A)
- Both teammates should explain the technical architecture and how they have collaborated
- Your presentation skills are also evaluated (5 pts) the precision and the accuracy
of your words are important
- During this presentation you should demonstrate your knowledge of all keys
concepts seen in this course
- You are asked to use a medium for your presentation (PowerPoint)
- The language is English (Non-negotiable)
