FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon
COPY package.json /usr/src/app/
RUN npm install
COPY gulpfile.js /usr/src/app/
COPY src /usr/src/app/src/
RUN npm run build
COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]
