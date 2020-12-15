# Weather_Dashboard

## Table of contents
* [Instructions](#Instructions)
* [Description](#Description)
* [Technologies](#Technologies)


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/rvk46/Weather_Dashboard
#For backend
(For Windows)
Setup Virtual Environment 
```bash
$ py -m pip install --user virtualenv
$ py -m venv env
$ .\env\Scripts\activate
```

Install the dependencies
```bash
$ pip install req.txt
```
* Download postgresql : https://www.postgresql.org/download/windows/ and pgadmin : https://www.pgadmin.org/
* Setup database in postgresql.
* Update the database info under 'Databases' in weather/setting.py file in the given format. And do- 

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```
* Add the city data likehttp://localhost:8000/addcity?city=Jaipur&lat=26.9&lon=75.7 and temperature data http://localhost:8000/addtemp?cities=Jaipur,Kanpur&date=09/12/2020




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


