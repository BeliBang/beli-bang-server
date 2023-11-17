# API Documentation Beli Bang

## EndPoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `GET /stores`
- `GET /stores/:id`
- `POST /stores`
- `PUT /stores/:id`
- `DELETE /stores/:id`

- `POST /foods`
- `GET /foods/:id`
- `PUT /foods/:id`
- `DELETE /foods/:id`

- `GET /orders`
- `POST /orders`
- `GET /orders/:id`
- `PUT /orders/:id`
- `DELETE /orders/:id`

- `GET /stores/rating/:storeId`
- `POST /stores/rating/:storeId`
- `DELETE /stores/rating/:id`

- `GET /foods/rating/:storeId`
- `POST /foods/rating/:storeId`
- `DELETE /foods/rating/:id`

- `GET /likes/:storeId`
- `POST /likes/:storeId`
- `DELETE /likes/:id`

&nbsp;

## POST /register

#### Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
  "profilePicture": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
```

OR

```json
{
  "message": "Email must be unique"
}
```

OR

```json
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Invalid email format"
}
```

OR

```json
{
  "message": "Password is required"
}
```

OR

```json
{
  "message": "Minimum password is 5 characters and maximum 12 characters"
}
```

OR

```json
{
  "message": "Role is required"
}
```

OR

```json
{
  "message": "Phone Number is required"
}
```

OR

```json
{
  "message": "Address is required"
}
```

&nbsp;

## POST /login

#### Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## - GET /stores

Description:

> get all stores from database

#### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "HISANA disuka",
    "status": false,
    "imageUrl": "image.jpg",
    "description": "Selamat datang di HISANA disuka destinasi terbaik untuk pencinta ayam goreng yang menginginkan cita rasa istimewa! Toko kami menawarkan pengalaman kuliner yang tak terlupakan dengan menu utama kami yang lezat dan beragam pilihan.",
    "latitude": "",
    "longitude": "",
    "area": "",
    "UserId": 1,
    "User": {
      "id": 1,
      "username": "seller1",
      "email": "seller1@mail.com",
      "role": "Seller",
      "phoneNumber": "0899999",
      "address": "jl.indonesia",
      "profilePicture": "https://media.licdn.com/dms/image/C5603AQFdKoZc74rnwA/profile-displayphoto-shrink_800_800/0/1626883365645?e=2147483647&v=beta&t=D5tXW8mAuk6ZNHEsGp7I9Jlu36n-p7u0VTLsdigqm1k",
      "latitude": "",
      "longitude": "",
      "area": ""
    }
  },
  ...
]
```

&nbsp;

## GET /stores/:id

Description:

> Get store by id from database

#### Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "HISANA disuka",
  "status": false,
  "imageUrl": "image.jpg",
  "description": "Selamat datang di HISANA disuka destinasi terbaik untuk pencinta ayam goreng yang menginginkan cita rasa istimewa! Toko kami menawarkan pengalaman kuliner yang tak terlupakan dengan menu utama kami yang lezat dan beragam pilihan.",
  "UserId": 1,
  "Food": [
    {
      "id": 1,
      "name": "Ayam Goreng Original",
      "imageUrl": "https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg",
      "price": 15000,
      "description": "Ayam goreng Original dengan tepung rahasia",
      "StoreId": 1
    },
    {
      "id": 2,
      "name": "Fire Chicken",
      "imageUrl": "https://www.seriouseats.com/thmb/Efkd6pn1nhg5V5Jkpv2ns_UunlE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__07__20150715-fried-chicken-01-6a95e8ae820a4ee4af40e05a9fc4e7e7.jpg",
      "price": 17000,
      "description": "Ayam goreng pedas dibalur dengan bubuk paprika dan juga cabai asli",
      "StoreId": 1
    },
    {
      "id": 3,
      "name": "Ayam Goreng Crispy",
      "imageUrl": "https://static.toiimg.com/thumb/61589069.cms?imgsize=788682&width=800&height=800",
      "price": 15000,
      "description": "Ayam goreng crispy yang renyah untuk pecinta crispy",
      "StoreId": 1
    }
  ],
  "User": {
    "id": 1,
    "username": "seller1",
    "email": "seller1@mail.com",
    "role": "Seller",
    "phoneNumber": "0899999",
    "address": "jl.indonesia",
    "profilePicture": "https://media.licdn.com/dms/image/C5603AQFdKoZc74rnwA/profile-displayphoto-shrink_800_800/0/1626883365645?e=2147483647&v=beta&t=D5tXW8mAuk6ZNHEsGp7I9Jlu36n-p7u0VTLsdigqm1k"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Store Not Found"
}
```

&nbsp;

## POST /stores

Description:

> add new store to database

#### Request:

- Headers:

```json
{
  "Content-Type": "application/JSON",
  "access_token": "string"
}
```

- Body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "description": "string",
  "createdAt": "DateString",
  "updatedAt": "DateString"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success create store"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

OR

````json
{
    "message": "Image is required"
}
OR
```json
{
    "message": "Description is required"
}
````

&nbsp;

## PUT /stores/:id

Description:

> Update store by id

#### Request:

- headers

```json
{
  "Content-Type": "application/JSON",
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "description": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success updating store information"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Store Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden for the owner"
}
```

&nbsp;

## DELETE /stores/:id

Description:

> Delete store from database By id

#### Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Store has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Store Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden for the owner"
}
```

&nbsp;

## POST /foods

Description:

> Add new food to Store user

#### Request:

- headers

```json
{
  "Content-Type": "application/JSON",
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "integer",
  "description": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Successfully added food"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

OR

```json
{
  "message": "Image is required"
}
```

OR

```json
{
  "message": "Price is required"
}
```

OR

```json
{
  "message": "Description is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Store Not Found"
}
```

&nbsp;

## GET /foods/:id

Description:

> get food from database By id

#### Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Ayam Goreng Original",
    "imageUrl": "https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg",
    "price": 15000,
    "description": "Ayam goreng Original dengan tepung rahasia",
    "StoreId": 1,
    "RatingFoods": []
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food Not Found"
}
```

&nbsp;

## PUT /foods/:id

Description:

> Edit food from database By id

#### Request:

- headers

```json
{
  "Content-Type": "application/JSON",
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "inter",
  "description": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success updating food information"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

OR

```json
{
  "message": "Image is required"
}
```

OR

```json
{
  "message": "Price is required"
}
```

OR

```json
{
  "message": "Description is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not the Owner"
}
```

&nbsp;

## DELETE /foods/:id

Description:

> Delete food from database By id

#### Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Food has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not the Owner"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```