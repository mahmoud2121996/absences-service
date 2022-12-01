# absences-service

## how to run:
- clone this repo

#### run on local machine: 
1- run `npm i` for the back-end and front-end<br>
2- run `npm start` for the back-end and front-end<br>
3- front-end should start on port 3000 and back-end should start on port 5000<br>
4- run `npm test` to run the tests for the front-end<br>

#### run using docker: 
1- build the back-end docker image by running : `docker build . -t absences-back-end-app`<br>
2- build the front-end docker image by running : `docker build . -t absences-front-end-app`<br>
3- run it using : `docker compose up` it should start the front-end and the back-end containers<br>
