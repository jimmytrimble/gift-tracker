FROM node:latest

WORKDIR /gift-tracker-backend

COPY . /gift-tracker-backend/

RUN yarn install

EXPOSE 8081

CMD ["npm", "start"]