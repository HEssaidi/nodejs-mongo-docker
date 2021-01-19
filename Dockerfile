FROM node:12

# Create app directory : install packages into container, create folders,
RUN mkdir -p /usr/src/app
#working directory for the instructions that follow.
WORKDIR /usr/src/app   

# Install app dependencies
# copies files and directories to the container
COPY package*.json /usr/src/app/
#COPY package*.json ./

RUN npm install


# Bundle app source
#COPY . .
COPY . /usr/src/app

EXPOSE 3000
CMD [ "node", "index.js" ]
#default command to launch nodejs app 
#which will be executed only when you run container without specifying a command