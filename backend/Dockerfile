FROM node:20-alpine

WORKDIR '/app/backend'
COPY package.json .
COPY database .
COPY env .
RUN npm install && npm install -g @nestjs/cli
COPY . .
CMD ["npm", "run", "start:dev"]