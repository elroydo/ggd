
### Group 31
![sadsae](https://user-images.githubusercontent.com/72175303/112560155-77568080-8dca-11eb-88cf-d5bb95393bf9.png)
# GGD &middot; ![npm version](https://img.shields.io/npm/v/react.svg?style=flat) &middot; ![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.0-yellowgreen.svg) &middot; ![Java](https://img.shields.io/badge/Java-v11.0-orange.svg)
We’re **raising awareness** and **providing insight** on the different types of pollution, climate-related hazards, land degradation, and natural disasters that are affecting various regions of the world, **enabling people** to take action by reducing their environmental footprint. Users can track and monitor their statistics with a personalised account and access reliable data and news sources through various mediums. All the while collectively working towards the following UN Sustainable Development Goals:
![qwe](https://user-images.githubusercontent.com/72175303/112559949-f7c8b180-8dc9-11eb-83e4-e1b585514571.png)

## A glimpse...
![home](https://user-images.githubusercontent.com/72175303/112677950-40cc4480-8e62-11eb-9cc4-fee2c24473f1.gif)

## MVPs
![features copy2](https://user-images.githubusercontent.com/72175303/112678212-8ee14800-8e62-11eb-9279-9358b421841f.png)

## Built With
Component         | Technology
---               | ---
Frontend          | [React 17+](https://reactjs.org/) and [Bootstrap 5+](https://react-bootstrap.github.io/)
Backend           | [Spring Boot 2.4+](https://spring.io/projects/spring-boot) and [Java 11+](https://www.oracle.com/java/)
Security          | [Spring Security](https://spring.io/projects/spring-security) and [JWT](https://jwt.io/)
Auth              | Local, Google, and Facebook
Database          | [MySQL](https://www.mysql.com/)
Persistence       | [JPA](https://spring.io/projects/spring-data-jpa) and [Hibernate](https://www.baeldung.com/spring-boot-hibernate)
Client Build      | [npm](https://www.npmjs.com/)
Server Build      | [Maven](https://maven.apache.org/)
APIs              | [Google News](https://newsapi.org/) and [UserWay](https://userway.org/)


## Getting Started
### Prerequisites
* Node.js
* Eclipse or Visual Studio with Spring Tools
* Local MySQL Server


## Installation
### Local MySQL Server
1. Create a new schema named ```ggd-unsdg```.

![mysql](https://user-images.githubusercontent.com/72175303/112675847-9521f500-8e5f-11eb-922a-dc3c3791fd90.gif)


### Frontend
1. Get your API KEY at [Google News](https://newsapi.org/).
2. Clone the repo and ```cd``` into ggd-app-client.
3. Install NPM packages listed below in 'Required React Modules'
4. Enter your API in ```Constants.js```

```javascript
export const NEWS_API_KEY = 'ENTER YOUR API'
```

#### Required React Modules
Module                | Command
---                   | ---
npm                   | ```$ npm install```
React jVectorMap      | ```$ npm install react-jvectormap```
React Router          | ```$ npm install react-router-dom```
Bootstrap             | ```$ npm install react-bootstrap bootstrap```
Semantic UI           | ```$ npm install semantic-ui```
Material-UI           | ```$ npm install @material-ui/core```
@nivo/core            | ```$ npm install @nivo/core```
@nivo/bar             | ```$ npm install @nivo/bar```
@nivo/line            | ```$ npm install @nivo/line```
EmailJS               | ```$ npm install emailjs-com```
ReactCardFlip         | ```$ npm install react-card-flip```
React Facebook Login  | ```$ npm install react-facebook-login```
SweetAlert2           | ```$ npm install sweetalert2 sweetalert2-react-content```

### Backend
1. Import ggd-app-server into Eclipse or Visual Studio.
2. Amend ```application.properties``` accordingly (your server username and password).
````java
spring.datasource.url=jdbc:mysql://localhost:3306/ggd-unsdg
spring.datasource.username=root
spring.datasource.password=toor
````
## Authors
* **Rozerin Baran** (1905101)
* **Keeley Gardner** (1904553)
* **Marcos Rodriguez** (1832373)
* **Elroy Do Rosario** (1812502)
* **Rishi Herath Pathiranage** (1911183)
* **Abdulaziz Jama** (1911210)
* **Gan Villaruel** (1818181)
* **Cyrus Lee** (1903268)

See also the list of [contributors](https://github.com/BrunelCS/cs2001-2020_21-group31/contributors) who participated in this project.

## Acknowledgments
* To the best tutor in the world, we extend our thanks to **Nayna Patel**.
