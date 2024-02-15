const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    gitHub: String
    img: String
    linkedIn: String
    password: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    title: String
    createdAt: String
    createdBy: String
    users: [User]!
    lists: [List]!
  }
  
  type List {
    _id: ID
    title: String
    projectId: ID
    cards: [Card]!
  }

  type Card {
    _id: ID
    title: String 
    listId: ID
    description: String
    createdAt: String
    comments: [Comment]!
    toDoes: [ToDo]!
  }

  type ToDo {
    _id: ID
    text: String
    isCompleted: Boolean
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    projects: [Project]
    projectId(projectId: ID!): Project
    card(cardId: ID!): Card
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, projectAuthor: String!, authId: ID!): Project
    addList(title: String!, projectId: ID!): List
    addCard(title: String!, listId: ID!, description: String!): Card
    addComment(
      cardId: ID!
      commentText: String!
      commentAuthor: String!
    ): Card
    removeComment(cardId: ID!, commentId: ID!): Card
    addToDo(
      cardId: ID!
      text: String!
    ): Card
    removeToDo(cardId: ID!, toDoId: ID!): Card
    removeCard(cardId: ID!, listId: ID!): Card
    removeList(listId: ID!, projectId: ID!): List
    updateToDo(toDoId: ID!, cardId: ID!, text: String!, isCompleted: Boolean!): Card
    updateCard(cardId: ID!, description: String, title: String, expirationDate: String): Card
    updateList(listId: ID!, title: String!): List
    updateProject(projectId: ID!, title: String!): Project
    addUserProject(projectId: ID!, userId: ID!): Project
    removeProject(userId: ID!, projectId: ID!): Project
    updateUser(userId: ID!, username: String, email: String, gitHub: String, password: String, img: String, linkedIn: String): User
  }
`;

module.exports = typeDefs;
