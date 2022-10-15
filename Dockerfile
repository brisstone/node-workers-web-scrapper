FROM node:14.14.0-alpine
WORKDIR "/src"
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8081
CMD ["npm", "run", "start"]