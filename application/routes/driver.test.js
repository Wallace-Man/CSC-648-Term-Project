// driver.test.js
const request = require('supertest');
const express = require('express');
const app = express();
const session = require('express-session');
const driverRouter = require('./driver');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: true }));
app.use('/', driverRouter);

describe('Driver Routes', () => {
    const testDriver = {
        username: 'test_driver',
        email: 'test.driver@example.com',
        password: 'test123',
        secPassword: 'test123',
        phoneNum: '123-456-7890',
    };

    test('POST /driver', async () => {
        const res = await request(app)
            .post('/driver')
            .send(testDriver);

        expect(res.statusCode).toBe(302);
        expect(res.header.location).toBe('/');
    });

    // test('POST /driver/login', async () => {
    //     const loginCredentials = {
    //         username: testDriver.username,
    //         password: testDriver.password,
    //     };
    //
    //     const res = await request(app)
    //         .post('/driver/login')
    //         .send(loginCredentials);
    //
    //     expect(res.statusCode).toBe(302);
    //     expect(res.header.location).toBe('/');
    // });
});
