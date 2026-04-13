# Inherit Dockerfile containing Linux Alpine + Node.js 24:
FROM node:24-alpine

# Create project folder inside the image:
WORKDIR /app

# Copy package files into /app:
COPY ./Backend/package.json ./Backend/package-lock.json /app/

# Install node_modules: 
RUN npm install

# Copy our App
COPY ./Backend /app

# -------------------------------------------------------------

# When container start - which command will run our app:
ENTRYPOINT npm start
