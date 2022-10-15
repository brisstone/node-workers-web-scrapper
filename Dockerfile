FROM node:14.14.0-alpine
# set a directory for the app
WORKDIR /usr/src/app

# Used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install dependencies
RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

# define the port number the container should expose
EXPOSE 8081

CMD ["npm", "run", "start"]