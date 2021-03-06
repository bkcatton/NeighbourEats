# NeighbourEats

A RESTful web API that allows users to buy and sell home-cooked
food items with their local neighbours. Core features are built
around the Google Maps API and includes an interactive map
browsing interface, dynamic search, sorting, filtering.

## Lighthouse Labs
Final project for [Lighthouse Labs](https://www.lighthouselabs.ca/en/web-development-bootcamp).\
Created by [Albert Ho](https://github.com/albho),
[Ben Catton](https://github.com/bkcatton),
and [Christian Girling](https://github.com/girlingc).\
Check out our planning documents in the [wiki](https://github.com/bkcatton/NeighbourEats/wiki) tab!

## Stack
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [PostgreSQL](https://www.postgresql.org/docs/current/app-psql.html)

## Getting Started
Clone the project from githup using either HTTPS or SSH
- HTTPS - `git clone https://github.com/bkcatton/NeighbourEats.git`
- SSH - `git clone git@github.com:bkcatton/NeighbourEats.git`

### API Keys Are Required to Run this App
1. You will need your own google maps api key. Sign up for a free one [here](https://developers.google.com/maps)

   You *must* enable the following options from the google maps api dashboard:
   
   i. Distance Matrix API
   
   ii. Geocoding API

   iii. Maps JavaScript API

2. You will need your own Stripe API key. Sign up for one [here](https://stripe.com/docs/api)
   
3. Assign both of the API keys to your own `.env` file in the /client directory. See the `.env.example` file for reference

4. You may need to download an extension to allow CORS on your browser. We used [this extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) from the chrome web store.

### Install PostgreSQL
- Ensure you have [PostgreSQL](https://www.postgresql.org/docs/13/app-psql.html) installed on your local machine.
- Create a database on your local machine and put the appropriate keys to the `.env` file in the /server directory. See the `.env.example` file for reference.

### Install Dependencies

To install server dependencies:
1. Navigate to /server with `cd server`
2. Install dependencies with `npm install`

To install client dependencies:
1. Navigate to /client with `cd client`
2. Install dependencies with `npm install`

### Starting The App

1. Open two different terminal windows, one for the server and one for the client
2. Navigate to /server with `cd server`
3. Seed database with the following command:
`npm run db:reset`
4. Start the server with `nodemon index.js`, or `node index.js`
5. In your other terminal window, navigate to /client with `cd client`
6. Start the client side with the following command:
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may see some lint errors in the console.

## Using the App

### You can filter options by walking time
![Search by distance](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/app_demo_1.gif?raw=true)

### Hover over a dish to see where it is on the map
![Flag Hover](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/App_hover_demo.gif?raw=true)

### Search by dish name or by country
![Search by Country of Origin](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/app_search_demo.gif?raw=true)

### Search by multiple filters at the same time
![Search by Multiple Filters](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/app_multi_search_demo.gif?raw=true)

### Main Page - browse for a dish
![Browse](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/App_Browse.png)

### Cart - see all dishes in your cart
![Cart](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/App_Cart.png)

### Current Orders - see what has been ordered from your available dishes
![Current Orders](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/Current_orders.png)

### Previous Orders - see what you have ordered in the past
![Previous Orders](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/Previous_orders.png)

### Add a New Dish
![Add a new dish](https://github.com/bkcatton/NeighbourEats/blob/main/client/public/Add_new_dish.png)







