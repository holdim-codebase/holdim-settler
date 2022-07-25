# MAIN IMAGE
FROM node:16.13.1-alpine3.15

# copy all relevant files
COPY . .

# install dependencies
RUN rm -rf node_modules && yarn install --frozen-lockfile
# compile typescript
RUN yarn run build

EXPOSE 8080

USER node

CMD [ "yarn", "start"]
