# Weather_Dashboard

## Table of contents
* [Instructions](#Instructions)
* [Description](#Description)
* [Technologies](#Technologies)


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/
```
#For backend
Install the dependencies
```bash
$ pip install req.txt
```
* Download postgresql : https://www.postgresql.org/download/windows/ and pgadmin : https://www.pgadmin.org/
* Setup database in postgresql.
* Update the database info under 'Databases' in weather/setting.py file in the given format.
* Add the city data by  http://localhost:3000/api/addcity=Noida and temperature data http://localhost:3000/api/addtemp=Noida



Run it
```bash
$ python manage.py runserver
```


#For frontend
Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install # or yarn
```

Run it
```bash
$ npm start # or yarn start
```

## Description
A simple react weather app. Front end is made in reactjs, backend in django. 
 
## Technologies
Project uses:
* Django
* Django REST Framework
* React jS
* Axios


