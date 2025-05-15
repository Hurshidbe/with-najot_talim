FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install 
#install orqasidan --production  ni qo'shub qo'ysak  devDependencies ni o'rnatmaydi. serverdan biroz joyimiz jetaladi
COPY . .
RUN yarn build
CMD [ "yarn" , "start:prod" ]