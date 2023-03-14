# Use the Node 14 image as a base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the application files into the container
# package.json contains list of dependencies required for the application to run
COPY package.json /app 
COPY index.js /app

# Install the dependencies
RUN npm install

# Expose the port used by the application
EXPOSE 8080

# Launch the application
CMD ["node", "index.js"]
