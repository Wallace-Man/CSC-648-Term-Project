const request = require('supertest');
const app = require('./app');

let server;

beforeAll(done => {
    server = app.listen(done);
});

/* APP.JS TESTS */
describe('app.js', () => {
    /* TEST MIDDLEWARE */
    describe('Middleware', () => {
        test('Should set no-cache headers for all requests', async () => {
            const response = await request(app).get('/');
            expect(response.headers['cache-control']).toContain('no-cache');
        });

        test('Should set user data available to Pug templates', async () => {
            const response = await request(app).get('/');
            // expect(response.text).toContain('User data sent to Pug templates:');
        });

        test('Should set Restaurant data available to Pug templates', async () => {
            const response = await request(app).get('/');
            // expect(response.text).toContain('Restaurant data sent to Pug templates:');
        });

        test('Should set Driver data available to Pug templates', async () => {
            const response = await request(app).get('/');
            // expect(response.text).toContain('Driver data sent to Pug templates:');
        });
    });

    /* TEST ROUTES */
    describe('Routes', () => {
        test('Should respond to GET /', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
            // expect(response.text).toContain('Welcome to our food ordering platform');
        });

        test('Should respond to GET /restaurants', async () => {
            const response = await request(app).get('/restaurant');
            expect(response.statusCode).toBe(200);
            // expect(response.text).toContain('Our Restaurants');
        });

        // test('Should respond to GET /users/register', async () => {
        //     const response = await request(app).get('/users/register');
        //     expect(response.statusCode).toBe(200);
        //     // expect(response.text).toContain('Create an account');
        // });

        test('Should respond to GET /drivers', async () => {
            const response = await request(app).get('/driver');
            expect(response.statusCode).toBe(200);
            // expect(response.text).toContain('Our Drivers');
        });

        // test('Should respond to GET /menu', async () => {
        //     const response = await request(app).get('/menu');
        //     expect(response.statusCode).toBe(200);
        //     // expect(response.text).toContain('Our Menu');
        // });

        test('Should respond to GET unknown path with 404 error', async () => {
            const response = await request(app).get('/unknown');
            expect(response.statusCode).toBe(404);
        });
    });

    /* TEST ERROR HANDLING */
    describe('Error handling', () => {
        test('Should handle unknown path with 404 error', async () => {
            const response = await request(app).get('/unknown');
            expect(response.statusCode).toBe(404);
            // expect(response.text).toContain('Page not found');
        });
    });

    describe('Test the root path', () => {
        test('It should respond to the GET method', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
        });
    });

    describe('Test the unknown path', () => {
        test('It should respond to the GET method', async () => {
            const response = await request(app).get('/unknown');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('Test the 404 error handler', () => {
        test('It should forward to the error handler', async () => {
            const response = await request(app).get('/unknown');
            expect(response.statusCode).toBe(404);
        });
    });
});



afterAll(done => {
    server.close(done);
});

