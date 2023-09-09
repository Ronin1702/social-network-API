# Social Network API [![MIT](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE)

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [API Routes](#api-routes)
- [Walkthrough Video](#walkthrough-video)
- [Links](#links)
- [License](#license)

## Description

```js
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

[_back to top_](#table-of-contents)

## Tech Stack

- [![Node.js](https://img.shields.io/badge/Node.js®-v20.5.1-blue?logo=node.js)](https://nodejs.org/en)

- [![npm](https://img.shields.io/badge/npm-v9.8.1-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)
  - [![Express Package](https://img.shields.io/badge/Express-4.18.2-green?logo=express)](https://www.npmjs.com/package/express)
  - [![DotEnv Package](https://img.shields.io/badge/DotEnv-16.3.1-green?logo=dotenv)](https://www.npmjs.com/package/dotenv)
  - [![Mongoose Package](https://img.shields.io/badge/Mongoose-7.5.0-green?logo=mongoose)](https://mongoosejs.com)
  - [![Validator Package](https://img.shields.io/badge/Validator-13.11.0-green?logo=npm)](https://www.npmjs.com/package/validator)

[_back to top_](#table-of-contents)

## Installation

- Packages to support this application can be installed by using [_npm install_](https://docs.npmjs.com/cli/v9/commands/npm-install) commands.

> **Note**: If you do not have a `package.json` in your directory already, enter command below to [_initiate_](https://docs.npmjs.com/cli/v9/commands/npm-init).
>
> ```bash
> npm init -y
> ```
>
>then
>
> ```bash
> npm i dotenv@16.3.1 express@4.18.2 mongoose@7.5.0 validator@13.11.0
> ```
>
> **Important**: Please @ the **EXACT** versions as shown above to ensure the functionality of this application.

- **If you wish to access your databases in your `cluster` on `MongoDB Atlas`, make sure to create a _`.env`_ file in the root directory and define the [connection string in URI format](https://www.mongodb.com/docs/manual/reference/connection-string/?utm_source=compass&utm_medium=product#std-label-connections-dns-seedlist) as the `SRV` example shown below:**

```js
MONGODB_URI=mongodb+srv://username:password@clustername.mongodb.net/Social-Network-API
```

<!-- - Seed the database with `node`:

```bash
node run seed
``` -->

[_back to top_](#table-of-contents)

## Usage

- This application can be invoked by using the following command:

```bash
npm start
```

- CRUD Workflow:

>To execute the CRUD workflow for `GET`, `POST`, `PUT`, and `DELETE` API requests,  please consult the [API Routes](#api-routes).

```js
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database.
WHEN I delete a user
THEN I also delete the associated thoughts of that user
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

---

### API Routes

>Use below param _**end points**_ for API requests when the server has started.
>>For example, in the API tool e.g. [Insomnia](https://insomnia.rest/), make a new `HTTP Request` <http://localhost:3000/api/users> to execute user API CRUD operations.

***`/api/users`***

- `GET` all users

- `POST` a new user: mongoDB will automatically create an `_id` for the new user

  ```json
  // Example JSON body to POST
  {
    "username": "ronin",
    "email": "ronin@github.com"
  }
  ```

---
***`/api/users/:userId`***

- `GET` a single user by its `_id` and populated thought and friend data

- `PUT` to update a user by its `_id`
  
    ```URL
    http://localhost:3000/api/users/5edff358a0fcb779aa7b118b
    ```

- You can also change `username` and/or `email`, add/remove `friends` by their `_id`s with `JSON` method as follows:

  ```json
  {
    //change ronin's username to ronin1702
    "username": "ronin1702",
    
    //change ronin's email to ronin1702@github.com
    "email": "ronin1702@github.com",

    "friends": [
      //adding two friends with their _id
      "64f3c522f4bb44d360d9dd98",
      "64f3bf3bf4bb44d360d9dd8f"
    ]
  }
  ```

  ```json
  {
    //removing all friends by leaving the array empty, without changing anything else
    "friends": []  
  }
  ```

- `DELETE` to remove user by its `_id`

>**Note**: Associated thoughts and reactions are deleted when the user is the deleted.

---
***`/api/users/:userId/friends/:friendId`***

- `GET` to retrieve a list of all friends for a single user by `_id`

- `POST` to add a new friend to a user's friend list
  - `URL` method: adding `userId`: `64f3c522f4bb44d360d9dd98` as a friend to `userId`: `5edff358a0fcb779aa7b118b`

    ```url
    http://localhost:3000/api/users/5edff358a0fcb779aa7b118b/friends/64f3c522f4bb44d360d9dd98
    ```

  - `JSON` method

    ```URL
    http://localhost:3000/api/users/5edff358a0fcb779aa7b118b/
    ```

    and pass the `friends`' `_id`s in the `JSON body` of the `POST` request as follows:

    ```json
    // Example JSON body to POST
    {
      "friends": [
        "64f3c522f4bb44d360d9dd98"
      ]
    }
    ```

- `DELETE` to remove a friend from a user's friend list

---
***`/api/thoughts`***

- `GET` to get all thoughts
- `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

  ```json
  // Example JSON body to POST
  {
    "thoughtText": "Here's a cool thought...",
    "username": "ronin1702",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```

---
***`/api/thoughts/:thoughtId`***

- `GET` to get a single thought by its `_id`

- `PUT` to update a thought by its `_id`

- `DELETE` to remove a thought by its `_id`

---
***`/api/thoughts/:thoughtId/reactions`***

- `POST` to create a reaction stored in a single thought's `reactions` array field

---
***`/api/thoughts/:thoughtId/reactions/:reactionId`***

- `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

[_back to top_](#table-of-contents)

## Walkthrough Video

> - **👇🏼 Click Image Below for Walkthrough Video Online.**

[![Screenshot](./images/MongoDB-Insomnia-API.png)](https://github.com/Ronin1702/social-network-API/assets/131393836/ccc01b8c-7b65-4c27-81f2-a0f63b819e04)

[_back to top_](#table-of-contents)

## Links

[![Tweet about this](https://img.shields.io/static/v1.svg?label=Tweet%20about%20this&message=🎵&color=blue&logo=twitter&style=social)](https://twitter.com/intent/tweet?text=Check%20out%20this%20social%20network%20API%20on%20GitHub:%20https://github.com/Ronin1702/social-network-API)

- GitHub Repo: [social-network-API](https://github.com/Ronin1702/social-network-API)
- API Tools: [Insomnia](https://insomnia.rest/products/insomnia), [Postman](https://www.postman.com/downloads/)
- NoSQL Tool: [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

[_back to top_](#table-of-contents)

## License

- This application is licensed by [![MIT](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE).

[_back to top_](#table-of-contents)

---
[![Copyright](https://img.shields.io/static/v1.svg?label=Social%20Network%20API%20©️%20&message=%202023%20Kai%20Chen&labelColor=informational&color=033450)](https://kaichen.biz)
