FROM node:alpine
WORKDIR /usr/scr/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm" , "start"]