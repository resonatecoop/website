ARG HUGO_VERSION=0.88.0
ARG NODE_ENV=development

FROM node:12-alpine as builder

ARG HUGO_VERSION
ENV HUGO_VERSION $HUGO_VERSION
ENV HUGO_BINARY hugo_${HUGO_VERSION}_Linux-64bit.tar.gz

RUN set -x && \
  apk add --update wget ca-certificates && \
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} && \
  tar xzf ${HUGO_BINARY} && \
  rm -r ${HUGO_BINARY} && \
  mv hugo /usr/bin && \
  apk del wget ca-certificates && \
  rm /var/cache/apk/*

WORKDIR /var/www/website

COPY . .

ENV NODE_ENV=development

RUN npm install

RUN npm install -g gulp

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN gulp

RUN hugo -d ./public

FROM alpine:latest

WORKDIR /var/www/website

COPY --from=builder /usr/bin/hugo /usr/bin/

COPY --from=builder /var/www/website /var/www/website
