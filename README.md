
# HEMERA API
![Logo](https://mk0omswamil19tswp4ab.kinstacdn.com/wp-content/uploads/2020/12/Universe-Real.jpg)

API of the ESGI Annual Project **Hemera**

![Deploy Hemera API](https://github.com/ynniss/hemera-api/actions/workflows/deploy.yaml/badge.svg)

  
## Authors

- [@Watliel](https://www.github.com/Watliel)
- [@Mdennoun](https://www.github.com/Mdennoun)
- [@Ynniss](https://www.github.com/Ynniss)

## Deployment

First, install the dependencies:
```
  npm i
```

Then, launch the app with nodemon:
```
npm run dev
```
  
## API Reference

[Postman Collection](https://www.getpostman.com/collections/d3bdf3a86eb54f216b10)

### Monitoring

#### PING the API :)
```http
  GET /ping
```
just return a 200 and the message ```pong```, which guarantees API and web server are up.

<br>

### User
#### Register
```http
  POST /register
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| username | `String` | **Required** |
| password | `String` | **Required** |


#### Login
```http
  POST /login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| username | `String` | **Required** |
| password | `String` | **Required** |


#### Get ESP IP address (**AUTHENTICATION** needed)
```http
  GET /ip
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |


#### Save ESP IP address
```http
  PUT /ip
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |
| ip | `string` | **Required** |

#### Get led rgb color
```http
  GET /rgb-leds
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |

#### Modify/Create led rgb color (AUTHENTICATION needed)
```http
  PUT /rgb-leds
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |
| red | `Int` | **Required** |
| blue | `Int` | **Required** |
| green | `Int` | **Required** |

#### Get Unix timestamp
```http
  GET /unix-timestamp
```
* **No parameter needed**
* Return a unix timestamp, which will be used by the ESP

<br>

### Sensor data

#### get sensor data of the fourteen past days (**AUTHENTICATION** needed)
```http
  GET /sensor/past-fourteen-days/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |

#### Save new sensor data

```http
  PUT /sensor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Bearer Token | `Header` | **Required**, the token received after authentication. |
| co2      | `float` | **Required**.  |
| humidity      | `float` | **Required**. |
| temperature      | `float` | **Required**.  |


