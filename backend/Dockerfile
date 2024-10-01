FROM node:21

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

# Use pnpm to run the build script (which compiles TypeScript)
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "dev"]
