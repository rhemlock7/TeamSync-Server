const db = require('../config/connection');
const { User, Project, List, Card } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');
const projectSeeds = require('./projectSeeds.json');
const listSeeds = require('./listSeeds.json');
const cardSeeds = require('./cardSeeds.json')
db.once('open', async () => {
  try {
    // cleaning DB
    await cleanDB('Project', 'projects');
    await cleanDB('User', 'users');
    await cleanDB('List', 'lists');
    await cleanDB('Card', 'cards');
    // creating seeds for User
    const users = await User.create(userSeeds);
    // console.log(users)
    // creating seeds for projects
    for (let i = 0; i < users.length; i++) {
      const project = await Project.create({ title: projectSeeds[i].title, createdBy: users[i].username, users: [users[i]._id] });
      await User.findOneAndUpdate(
        { _id: users[i]._id },
        { $addToSet: { projects: project._id } }
      );
    }

    const userArr = await User.find().populate('projects')
    console.log(userArr);
    const projectsArr = await Project.find().populate('users');
    // console.log(projectsArr);

    // creating seeds for lists
    for (let i = 0; i < projectsArr.length; i++) {
      const listOne = await List.create({ title: listSeeds[i].title, projectId: projectsArr[i]._id });
      const listTwo = await List.create({ title: listSeeds[i].title, projectId: projectsArr[(projectsArr.length - 1 - i)]._id });
      await Project.findOneAndUpdate(
        { _id: projectsArr[i]._id },
        { $addToSet: { lists: listOne._id } }
      );
      await Project.findOneAndUpdate(
        { _id: projectsArr[i]._id },
        { $addToSet: { lists: listTwo._id } }
      );
    };
    const listArr = await List.find();
    // console.log(listArr);

    for (let i = 0; i < listArr.length; i++) {
      const cardOne = await Card.create({
        title: cardSeeds[i].title, description: cardSeeds[i].description, comments: cardSeeds[i].comments, listId: listArr[i]._id, toDoes: cardSeeds[i].toDoes
      });
      const cardTwo = await Card.create({
        title: cardSeeds[(listArr.length - 1 - i)].title, description: cardSeeds[(listArr.length - 1 - i)].description, comments: cardSeeds[(listArr.length - 1 - i)].comments, listId: listArr[i]._id, toDoes: cardSeeds[(listArr.length - 1 - i)].toDoes
      });
      await List.findOneAndUpdate(
        { _id: listArr[i]._id },
        { $addToSet: { cards: cardOne._id } }
      );
      await List.findOneAndUpdate(
        { _id: listArr[i]._id },
        { $addToSet: { cards: cardTwo._id } }
      );
    }
    const cardArr = await Card.find();
    console.log(cardArr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
