const { app } = require('./app');
const PORT = 3000;
const { db, Person, Dish } = require('../db');

async function syncAndSeedDatabase() {
  try {
    await db.sync({ force: true });
    //  Create some rows in your Person and Dish tables here
    //  to interact with your API using the `npm run start:watch`
    //  or `npm run start` commands.

    const people = [
      {
        name: 'larry',
        isAttending: true
      },
      {
        name: 'Hulu',
        isAttending: true
      }
    ]

    const dishes = [
      {
        name: 'turkey',
        description: 'juicy',
        personId: 1
      },
      {
        name: 'applePie',
        description: 'sweet',
        personId: 2
      }
    ]

    await Promise.all(people.map(person => Person.create(person)));
    await Promise.all(dishes.map(dish => Dish.create(dish)));

  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  console.log('done seeding and associating!');
}

syncAndSeedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
