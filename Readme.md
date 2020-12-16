
### Rentit

#### Overview

#### Getting Started
An utility application where landlord can post advertisements about renting their house to a tenant. There will be two groups of people who can benefit from this application. One group of people are the landlord/landlady and the other group will be the tenants. Landlord/landlady can post advertisements about vacancy in their house to rent to a tenant. The tenant can view those advertisements in their desired neighborhood and make an appointment with the landlord/landlady to view the house. This application can be useful to both groups of people mentioned above. For tenants who want to move to a new location but it’s inconvenient for them to go scout out the place every few days. Rather, with this application they can view the advertisements from the comfort of their smartphones and can plan whether to check out the house for renting or not. On the other hand, for landlords they don’t need to pursue local agencies or newspapers to post an ad about rent.  

Nowadays people love to spend time on their phones or laptops. So why not make posting and viewing advertisements much easier using a web application. Time is money, therefore, it’s a waste of time to go visit every house that has “For Rent” sign on it. If there’s an application for this purpose both parties can save valuable time. Zillow rentals has similar features but it’s not exclusive to renting house only.  This idea is different from Zillow rentals since it will be exclusively used to post and view advertisements about renting house. Traffic in Zillow rentals is very minimal in this category so this app will create a nice competition. 


#### Requirements
Technologies used for this projects are python and flask library, react, and mysql database

### To run this application
1. open a terminal and run the command git clone https://github.com/sajidmahmud69/Rentit.git

2. Once the git repository is ready use the terminal and write the command cd Rentit.

3. Create a virtual environment.

4. Write the command virtualenv rentit-venv

5. If the previous command gives and error use virtualenv by writing the command pip install virtualenv

6. Once the virtualenv is setup cd rentit-venv

7. Scripts\activate

8. When the virtual environment is activated you will see the environment name to the left of the terminal like (rentit-venv)

9. To install all python dependencies use command pip install -r requirements.txt

10. After that is done do cd ..  this will take you back to the directory of backend.

11. Run the command python app.py.

12 That will start the localhost server copy the link and paste it to a browser.

13. Now keep that terminal open and open a new one.

14. Like before navigate to rentit directory

15. cd frontend\rentit_react

16. npm install ( this will install all react and node modules needed for the project to run)

17. Once the setup is ready use the command npm start.

18 This will open up a window in your local browser with the web app running.


#### Data Model

The application will have users. Users can post ad listings and comments which will be stored.


An Example User:

{
  user_id: 1,
  firstName: "Mary",
  lastName: "Jane",
  email: "sajid@gmail.com",
  password: "12345656"
}
An Example Listing:

{
  list_id: 3,
  title: "Newy built house",
  price: "$250000",
  description: "This house has been constrtucted with the solar panel",
  image: "https://google.com/someimageurlfromgoogle",
  address: "123 testing road, NY, 11111"
}

A Comment listing:
{
  comment_id: 23,
  list_id: 12,
  user_id: 1
}

#### Site map
Home page is connected to the login and register page. Home also connects the settings page after a user has logged in.


#### User Stories or Use Cases

Non registered user can't do anything with this website.
As a registered user: they can post ad listings
                      they can post comments
                      they can delete their ad listings
                      they can change their password
                      they can delete their account and all listings with that account

#### Authors

Mumtahid Akash

MD Hossain

Sajid Mahmud
