FROM docker.io/library/node:14.16.0 as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci --production=false
RUN npm run build

# ----- multi-stage ----- #
FROM docker.io/library/node:14.16.0
WORKDIR /code
RUN mkdir -p ../ipcamrecord
RUN apt-get update && apt-get install -y ffmpeg

COPY . .
RUN npm ci --production=true
COPY --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]
#CMD [ "tail", "-f", "/dev/null" ]