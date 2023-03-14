# Project Planning

## Descrtiption

- Project title- Safe 2 Ship
- Project description- An app for community shipping (shippers and shipees) 
- Target audience - Mobile app users, companies looking for local logistics solutions
- Team members- Abdullah Khan, Martin Nfome


## MVP

Our app should allow authenticated users to post packages to be delivered (shipee) and picked up and delivered by drivers on the app (shippers).

- user authentication
- shipee posts packages
- shipper selects (claims) package for delivery
- shipee confirms
- shipper confirms after delivery

##### Stack Choices:
Front End- React Native
Back End- Node & Express
Database- PostgreSQL
Google Maps API


## Users (Tables/ERD)

1. Shipper
    - Name
    - Phone Number
    - email
    - Avatar
    - Number of Deliveries
    - User rating (max 5 - cumulative rating sum)
    - Bio
    - Company Information (optional) / Personal link
    - Fleet
    - Driving Record

2. Customer
    - Name
    - Phone Number
    - email
    - Avatar
    - Number of Orders
    - User rating  (max 5 - cumulative rating sum)
    - Bio
    - Company Information (optional) / Personal link

3. Package
    - size
    - weight range
    - description
    - source
    - destination
    - status
    - foreign key -> customer

4. Order
    - map
    - foreign key -> package
    - foreign key -> shipper
    - foreign key -> customer

## User stories

##### Shipper 

As a shipper, I should be able to create an account

As a shipper, I should be able to authenticate to log in

As a shipper, I should be able to view my profile

As a shipper, I should be able to view posted packages

As a shipper, I should be able to filter queries to posted packages

As a shipper, I should be able to select a posted package and view it's details

As a shipper, I should be able to add packages to create a delivery order (to wait for shipee confirmation)

As a shipper, once confirmed I should be able to deliver the package

As a shipper, once I deliver the package, I should be able to confirm it's delivery


##### Shipee

As a shippee, I should be able to create an account

As a shippee, I should be able to authenticate to log in

As a shippee, I should be able to view my profile

As a shippee, I should be able to create orders with packages

As a shippee, recieve requests for order by shipper and I should be able to confirm/cancel

As a shippee, recieve confirmation on delivery


##### Stretch Features for both

- Add work schedule for (shipper)

- Add time frame for package to be delivered (by shipee)

- In app messaging

- Maps feature


## Pricing structure

small- < 15 lbs small box, can be handle with one hand --> 2.99 + 0.30 km 
medium- 15 - 30lbs, requires 2 hands to lift --> 4.99 + 0.30 km
large- 30lbs+ , requires 2 people to lift --> 7.99 + 0.30 km
custom- 11.99 + .3 km (plus size/weight fee)