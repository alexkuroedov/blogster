FROM node:8.11

#set working catalog to app

RUN mkdir -p /app
WORKDIR /app
 
COPY ./app/package*.json ./

# set command is a built-in function of the Bourne shell (sh), C shell (csh), and Korn shell (ksh), which is used to define and determine the values of the system environment
# -e 	Exit immediately if a command exits with a non-zero exit status.
# -x 	Print commands and their arguments as they are executed.
# Pipenv позволяет устанавливать зависимости в родительскую систему при указании флага --system:
# RUN set -ex && npm install
RUN npm install

COPY ./app ./

EXPOSE 3000

# ENTRYPOINT npm start 
CMD ["npm","start"]
