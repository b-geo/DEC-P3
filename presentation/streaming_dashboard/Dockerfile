# Use the official Node.js image as a base
FROM node:22-slim

# Create and set the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
