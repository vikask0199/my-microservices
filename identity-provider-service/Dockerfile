FROM node:20.12.2

WORKDIR /app

COPY package.json  ./

RUN npm install

COPY . /app

EXPOSE 5000

CMD ["node", "src/index.js"]
