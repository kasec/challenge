# angular-mongo-auth

## How to run?
> If you want to deploy in Google Cloud Platform, you must create a app.yaml file with the next values
 
 ```yaml
 //app.yaml
runtime: nodejs10

service: mongo-angular-auth

env_variables:
  SECRET_KEY: 
  PORT: 
  MONGO_HOST: 
  MONGO_DB: 
  MONGO_USER: 
  MONGO_PASS: 
 ```

> If you want run in another place you need a `.env`

```
SECRET_KEY: 
PORT: 
MONGO_HOST: 
MONGO_DB: 
MONGO_USER: 
MONGO_PASS:
```
## Run in production mode
```bash
> npm i //install dependencies
> npm start
```
