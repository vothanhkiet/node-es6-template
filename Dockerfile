FROM mhart/alpine-node
MAINTAINER Kiet Thanh Vo <kiet@ventuso.net>

ENV CI=true
EXPOSE 5858

RUN apk add --update socat git
RUN socat tcp-listen:5858,reuseaddr,fork tcp:localhost:6000 &

# If you have native dependencies, you'll need extra tools
# RUN apk add --update make gcc g++ python

# If you had native dependencies you can now remove build tools
# RUN apk del make gcc g++ python && \
#   rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

RUN npm install -g nodemon
RUN npm install -g bower

## cache package.json
#ADD package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN mkdir -p /src/app && cp -a /tmp/node_modules /src/app/
#
#ADD bower.json /temp/
#
#WORKDIR /src/app
#ADD . /src/app
