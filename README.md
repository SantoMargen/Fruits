# Fruits

### How to Use

- clone repo https://github.com/SantoMargen/Fruits
- run npm install
- run npm start
- it may take a long time to connect to mongoDB atlas, wait for it to connect to mongoDB atlas

## user

| username      | password   | Role  |
| :------------ | :--------- | ----- |
| admin_bambang | Password1$ | Admin |
| user_joko     | Password1$ | User  |

### List of Roles

- Admin
- User

## List API

### Login Admin/ User

| Type   | Path                        | Description                |
| :----- | :-------------------------- | :------------------------- |
| `POST` | http://localhost:4000/login | [input: username password] |

### Register User

| Type   | Path                           | Description                                                   |
| :----- | :----------------------------- | :------------------------------------------------------------ |
| `POST` | http://localhost:4000/register | [input: fullName username email password phoneNumber address] |

### Get Fruits

| Type  | Path                         | Description      |
| :---- | :--------------------------- | :--------------- |
| `GET` | http://localhost:4000/fruits | [Get all fruits] |

### Create New fruit

| Type   | Path                         | Description                                    |
| :----- | :--------------------------- | :--------------------------------------------- |
| `POST` | http://localhost:4000/fruits | [input: name, family_id, genus_id, nutritions] |
|        |                              | input nutritionstype object                    |

### Update fruit

| Type  | Path                                  | Description                                              |
| :---- | :------------------------------------ | :------------------------------------------------------- |
| `PUT` | http://localhost:4000/fruits/:fruitId | [input(optional): name, family_id, genus_id, nutritions] |
|       |                                       | input nutritionstype object, req.params: fruitId         |

### Delete fruit

| Type     | Path                                  | Description            |
| :------- | :------------------------------------ | :--------------------- |
| `DELETE` | http://localhost:4000/fruits/:fruitId | [req.params: fruitId ] |
