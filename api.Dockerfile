FROM node:latest

WORKDIR /app/api_hubbe

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
