FROM node:12.19
MAINTAINER YeCheng Wang <yecheng.wang@sjsu.edu>

ADD backend /app/backend
ADD frontend /app/frontend

WORKDIR /app/frontend

RUN npm install && npm install -g @angular/cli && ng build --prod
RUN rm -rf ../backend/static
RUN mv dist ../backend/static

WORKDIR /app/backend
RUN npm install

RUN chmod +x entrypoint.sh
VOLUME /app/backend/config

EXPOSE 8080
CMD ["/app/backend/entrypoint.sh"]
