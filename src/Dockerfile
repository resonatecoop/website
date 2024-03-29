ARG RELEASE_TAG=develop
ARG HUGO_VERSION=0.88.1
ARG NODE_ENV=development

FROM node:14-alpine

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

WORKDIR /build

ARG RELEASE_TAG

RUN apk --no-cache add git

RUN git clone --branch ${RELEASE_TAG} --single-branch --depth 1 https://github.com/resonatecoop/website

ENV NODE_ENV development

WORKDIR /build/website/src

RUN npm install -g @babel/cli @babel/core postcss@7.x postcss-cli@7.x
RUN npm install

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN hugo -d ./public -e ${NODE_ENV}
