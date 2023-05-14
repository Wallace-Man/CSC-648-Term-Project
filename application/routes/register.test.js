const request = require('supertest');
const express = require('express');
const registerRoutes = require('./register');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'test-secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use('/', registerRoutes);

describe('Register Routes', () => {
    // test('GET /signup', async () => {
    //     const res = await request(app).get('/signup');
    //     expect(res.statusCode).toBe(200);
    // });

    test('POST /signup', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            password2: 'password123',
        };

        const res = await request(app).post('/signup').send(userData);
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/login');
    });

    // test('POST /signup with non-matching passwords', async () => {
    //     const userData = {
    //         username: 'testuser2',
    //         email: 'testuser2@example.com',
    //         password: 'password123',
    //         password2: 'password321',
    //     };
    //
    //     const res = await request(app).post('/signup').send(userData);
    //     expect(res.statusCode).toBe(200);
    // });
});
