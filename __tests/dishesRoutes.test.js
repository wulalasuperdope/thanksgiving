// tests for /api/dishes

// supertest is a module that allows us to test our express server
const request = require('supertest');
const { app } = require('./../server/app.js');
const { db, Dish, Person } = require('./../db/index.js');

beforeEach(async done => {
  // wipe the db before each test block
  await db.sync({ force: true });
  done();
});
afterAll(async done => {
  // close the db connection upon completion of all tests
  await db.close();
  done();
});
describe('/api/dishes routes', () => {
  // its up to you to create the test conditions for /api/dishes
  // add as many tests as you feel necessary to fully cover each routes functionality
  const dish1 = { name: 'turkey', description: 'juicy' };
  const dish2 = { name: 'pie', description: 'sweet' };
  describe('GET to /api/dishes', () => {
    it('should retrieve all dishes if no params are given', () => {
      return Promise.all([Dish.create(dish1), Dish.create(dish2)]).then(
        () => {
          return request(app)
            .get('/api/dishes')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              const dishes = response.body;
              expect(dishes.length).toBe(2);
              expect(dishes).toEqual(
                expect.arrayContaining(
                  [
                    expect.objectContaining(dish1),
                    expect.objectContaining(dish2),
                  ]
                )
              )
            })
            .catch(err => {
              fail();
            });
        }
      )

    });
  });

  describe('GET to /api/dishes/:id', () => {
    it('should retrieve dish based on params id', async () => {
      try {
        await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2)
        ]);
        const dish1Response = await request(app).get(
          '/api/dishes/:id'
        );
        const dish1Id = dish1Response.params;
        expect(dish1Id).toEqual(dish1.id)

      } catch (err) {
        fail();
      }

    });
  });

  xdescribe('POST to /api/dishes/', () => {
    it('does a test!', () => {
      fail();
    });
  });

  xdescribe('PUT to /api/dishes/:id', () => {
    it('does a test!', () => {
      fail();
    });
  });

  xdescribe('DELETE to /api/dishes/:id', () => {
    it('does a test!', () => {
      fail();
    });
  });
});
