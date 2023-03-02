# Base image
FROM node:16.16.0

# Create app directory
WORKDIR /app

ENV PORT 3000
ENV HOST 0.0.0.0

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY prisma ./prisma/


COPY tsconfig.json ./


# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

#Run geerate tables
RUN npx prisma generate

#RUN npx prisma db push

#RUN npx prisma db seed

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]