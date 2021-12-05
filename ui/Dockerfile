FROM gcr.io/google-appengine/nodejs
WORKDIR /app
COPY package.json package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PORT=8080
CMD [ "npm", "run", "start" ]
