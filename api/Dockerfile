FROM gcr.io/google-appengine/nodejs
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start-nodemon" ]
