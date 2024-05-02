FROM node:20-alpine

WORKDIR /app/client
COPY package*.json .
RUN npm install && npm install -g vite
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]