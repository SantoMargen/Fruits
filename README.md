# Fruits

## How to Use

    1. clone repo https://github.com/SantoMargen/Fruits
    2. run npm install
    3. run npm start

## user

| username      | password   | Role  |
| :------------ | :--------- | ----- |
| admin_bambang | Password1$ | Admin |
| user_joko     | Password1$ | User  |

## List API

#### Login Admin/ User

| Type   | Path                        | Description                |
| :----- | :-------------------------- | :------------------------- |
| `POST` | http://localhost:4000/login | [input: username password] |

### Register User

| Type   | Path                           | Description                                                   |
| :----- | :----------------------------- | :------------------------------------------------------------ |
| `POST` | http://localhost:4000/register | [input: fullName username email password phoneNumber address] |

### Get Fruits

| Type  | Path                               | Description      |
| :---- | :--------------------------------- | :--------------- |
| `GET` | http://localhost:4000/users/fruits | [Get all fruits] |

### Create New fruit

| Type   | Path                               | Description                                    |
| :----- | :--------------------------------- | :--------------------------------------------- |
| `POST` | http://localhost:4000/users/fruits | [input: name, family_id, genus_id, nutritions] |
|        |                                    | input nutritionstype object                    |
