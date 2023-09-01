# Social Network API [![MIT](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE)

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Table of Contents

- [Description](#description)
- [Technology](#technology)
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

## Technology

- [![Node.js](https://img.shields.io/badge/Node.js®-v20.5.1-blue?logo=node.js)](https://nodejs.org/en)

- [![npm](https://img.shields.io/badge/npm-v9.8.1-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)
  - [![Express Package](https://img.shields.io/badge/Express-4.18.2-green?logo=express)](https://www.npmjs.com/package/express)
  - [![Mongoose Package](https://img.shields.io/badge/Mongoose-7.5.0-green?logo=mongoose)](https://mongoosejs.com)

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
> npm i express@4.18.2 mongoose@7.5.0
> ```
>
> **Important**: Please @ the **EXACT** versions as shown above to ensure the functionality of this application.

- **If you would like to `use` your databases from `cloud.MongoDB.com`, make sure to create a _`.env`_ file in the root directory and define the `connection string` as the example shown below:**

```js
MONGODB_URI=mongodb+srv://username:password@clustername.mongodb.net/
```

- Seed the database with `node`:

```bash
node run seed
```

[_back to top_](#table-of-contents)

## Usage

- This application can be invoked by using the following command:

```bash
npm start
```

- Workflow:

>To execute the workflow for `GET`, `POST`, `PUT`, and `DELETE` API requests,  please consult the [API Routes](#api-routes).

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

>Use below _**end points**_ for API requests when the server has started.
>>For example, in the API tool such as [Insomnia](https://insomnia.rest/), go to <http://localhost:3000/api/users> for user API requests.

**`/api/users`**

- `GET` all users

- `GET` a single user by its `_id` and populated thought and friend data

- `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

- `PUT` to update a user by its `_id`

- `DELETE` to remove user by its `_id`

>**Note**: Associated thoughts are deleted when the user is the deleted.

---

**`/api/users/:userId/friends/:friendId`**

- `POST` to add a new friend to a user's friend list

- `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

- `GET` to get all thoughts

- `GET` to get a single thought by its `_id`

- `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- `PUT` to update a thought by its `_id`

- `DELETE` to remove a thought by its `_id`

---

 **`/api/thoughts/:thoughtId/reactions`**

- `POST` to create a reaction stored in a single thought's `reactions` array field

- `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

[_back to top_](#table-of-contents)

## Walkthrough Video

<!-- [![GIF Name](local GIF location)](Video Link) -->

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
