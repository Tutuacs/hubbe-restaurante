FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet --no-optional --no-fund --lolevel=error

RUN npm run build

CMD ["npm", "run", "dev"]