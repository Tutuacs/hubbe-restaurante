FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --quiet --no-optional --no-fund --lolevel=error

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "prod" ]