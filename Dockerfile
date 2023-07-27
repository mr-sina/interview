FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/interview

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# build project
RUN npm run build

EXPOSE 8070
CMD ["node" , "dist/main"]