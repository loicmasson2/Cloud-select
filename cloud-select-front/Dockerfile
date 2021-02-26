FROM node:alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
RUN npm install
