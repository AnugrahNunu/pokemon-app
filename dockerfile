FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 