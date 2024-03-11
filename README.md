## SIMBA Mission Control Interface

### Project Overview:
This sub-system of the SIMBA project enables the user to control the rover movement using their own machine. 

### Built with:
* [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
* [![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

## Getting Started

Below are the instructions on how to setup the frontend and backend for the SIMBA web app. Once the web app is setup, you should 
be able to run and communicate to the rover remotely assuming the rover is also setup properly.

### Prerequisites

Ensure you have ```npm``` on your machine
  ```sh
  npm install npm@latest -g
  ```
### Frontend Installation

1. Get the google maps API key from team credential documentation
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Create a `.env` file to store the API key
   ```js
   REACT_APP_GOOGLE_MAPS_API_KEY = 'ENTER YOUR API';
   ```
4. Go into the frontend folder
    ```sh
   cd react-frontend
   ```
5. Install NPM packages
   ```sh
   npm install
   ```
   
### Backend Installation

1. From the parent directory, go into the backend folder
   ```sh
   cd flask-frontend
   ```
2. Create a virtual environment
   ```sh
   python -m venv venv
   ```
3. Start a virtual environment
   ```sh
   source venv/bin/activate
   ```
4. Install packages
   ```sh
   pip install flask
   pip install flask_cors
   ```

### Run the Application
_Launch Flask App_
1. Open two seperate terminals
2. In one terminal, navigate into the flask-backend directory
3. Source the virtual environment
    ```sh
    source venv/bin/activate
    ```
3. Start the backend
    ```sh
    python3 base.py
    ```
_Launch React App_
1. Make sure you are in the react-frontend directory
2. Start the frontend
   ```sh
   npm start
   ```  

## Usage


This web application acts as the central control system for communicating with the rover. It provides directional control options such as moving forward, backward, left, right, and stopping. Additionally, users can initiate the arm pickup sequence, allowing the mechanical arm to grab objects using the onboard camera and vision algorithm. While the mechanical arm and camera vision components were developed by other teams, the web app seamlessly integrates these functionalities.

Currently, the app is still under development for route planning. This feature will enable users to select desired coordinates using the Google Maps API and send them as a route for the rover to follow. However, this functionality is not yet complete because the rover lacks support for I2C communication with the GPS and IMU modules.




