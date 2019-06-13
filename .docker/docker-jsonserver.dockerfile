FROM node:8.11

#set working catalog to app

RUN mkdir -p /data
WORKDIR /data

COPY ./app/db.json ./
COPY ./app/routes.json ./
COPY ./app/cors.js ./

# set command is a built-in function of the Bourne shell (sh), C shell (csh), and Korn shell (ksh), which is used to define and determine the values of the system environment
# -e 	Exit immediately if a command exits with a non-zero exit status.
# -x 	Print commands and their arguments as they are executed.
# Pipenv позволяет устанавливать зависимости в родительскую систему при указании флага --system:
# RUN set -ex && npm install
RUN npm install -g json-server


# EXPOSE 3004

CMD ["json-server","--watch","./db.json","--routes","routes.json","--middlewares","./cors.js","--host","0.0.0.0","--port","3004"] 
# CMD ["json-server","--watch","./db.json","--routes","routes.json","--middlewares","./cors.js","--port","3004"] 