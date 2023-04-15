const request = require('supertest');
const app = require('./app');

let server;

beforeAll(done => {
    server = app.listen(done);
});

describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
        const response = request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the unknown path', () => {
    test('It should respond to the GET method', async () => {
        const response = request(app).get('/unknown');
        expect(response.statusCode).toBe(404);
    });
});

describe('Test the 404 error handler', () => {
    test('It should forward to the error handler', async () => {
        const response = request(app).get('/unknown');
        expect(response.statusCode).toBe(404);
    });
});

describe('Test the error handler', () => {
    test('It should catch and handle errors', async () => {
        const response = request(app).get('/error');
        expect(response.statusCode).toBe(500);
    });
});


afterAll(done => {
    server.close(done);
});

