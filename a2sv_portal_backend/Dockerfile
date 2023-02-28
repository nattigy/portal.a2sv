# Base image
FROM node:16.16.0

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY prisma ./prisma/
# COPY ENV variable
COPY .env ./

COPY tsconfig.json ./


# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

#Run gemerate tables
RUN npx prisma generate

RUN npm prisma db seed

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]