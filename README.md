# Welcome! :smile:
I'm Jesus :grin: again and this is a small project based on an API developed with django (Python), relational database and a Map and Geolocation implementation with routing.
Developed from scratch, for participation in a orusxpert test as a frontend developer with:

* Django Framework - Python
* SQL Databases - MySQL,
* Angular js - Typescript
* Bootstrap - CSS3

Instructions :technologist:: 
* Please, check if you have installed at least python 3.10.0 :snake:
* Check if you have this libraries for python installed too: 
  - - `pip install dnspython`
  - - `pip install djangorestframework`
  - - `pip install django-cors-headers`
  - - `pip install mysqlclient`
* Check if you have installed MySQL and create a database with the name `testdb`
* Open DjangoAPI folder `cd DjangoAPI` and CHECK in **settings.py** if `DATABASES` has the correct config for your MySQL Database and Edit the fields if necessary.
* You will see something like this: 
```
`DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'testdb',
        'USER': 'admin',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}`
```
* Create the migrations for the CustomersApp using  `python manage.py makemigrations CustomersApp` and use `python manage.py migrate` to start migrations. 
* Start the server using `python manage.py runserver` Now server is running! :hear_no_evil:
* Open Frontend folder `cd Frontend` and run the `npm install` to get the node modules for the project and run the app with `ng serve`

**IMPORTANT:** Make sure to get the same HOST URL in the enviroment variables as `API: 'http://127.0.0.1:8000'` inside the angular project. If you have different You **NEED** to Change it or the CRUD won't work.

That's it, please contact me if You have questions :robot:

