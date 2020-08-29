# angular-mongo-auth


## How to run?
### Dev Environment
0. run `npm i` to install all dependencies.
1. You must have a mongodb instance in local or cloud.
2. Create a `.env` file with the below information.
3. Run *api* with `npm run api`
4. Run angular project with `npm run ng serve`.

### Prod Env
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
