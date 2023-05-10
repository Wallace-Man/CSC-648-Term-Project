const request = require('supertest');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { router, ensureAuthenticated } = require('./users');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: "34.102.56.1",
    user: "root",
    password: "Jaws0044!!!!@@@@",
    database: "restaurantdb",
});

// Promisify the connection.query function
const queryPromise = util.promisify(connection.query).bind(connection);

// Use a test database for the tests
connection.config.database = "restaurantdb_test";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(router);

// describe('Test the /login route', () => {
//     beforeEach(async () => {
//         // Create a test user with a hashed password
//         const hashedPassword = await bcrypt.hash('password', 10);
//         await queryPromise('INSERT INTO user (username, password) VALUES (?, ?)', ['testuser', hashedPassword]);
//     });
//
//     afterEach(async () => {
//         // Delete the test user from the test database
//         await queryPromise('DELETE FROM user WHERE username = ?', ['testuser']);
//     });
//
//     test('It should respond to the GET method', async () => {
//         const response = await request(app).get('/login');
//         expect(response.statusCode).toBe(200);
//     });
//
//     test('It should respond to the POST method with valid credentials', async () => {
//         const response = await request(app).post('/login').send({
//             username: 'testuser',
//             password: 'password'
//         });
//         expect(response.statusCode).toBe(302);
//         expect(response.header.location).toBe('/');
//     });
//
//     test('It should respond to the POST method with invalid credentials', async () => {
//         const response = await request(app).post('/login').send({
//             username: 'testuser',
//             password: 'wrongpassword'
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.text).toContain('Invalid username or password');
//     });
// });

describe('Test the ensureAuthenticated middleware', () => {
    test('It should call the next function if user is authenticated', () => {
        const req = { session: { user: {} } };
        const res = {};
        const next = jest.fn();
        ensureAuthenticated(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('It should redirect to /login if user is not authenticated', () => {
        const req = { session: {} };
        const res = { redirect: jest.fn() };
        const next = jest.fn();
        ensureAuthenticated(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    });
});

describe('Test the /logout route', () => {
    test('It should destroy the session and redirect to the home page', async () => {
        const response = await request(app).get('/logout');
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe('/');
    });
});

afterAll(async () => {
    // Close the MySQL connection
    try {
        if (connection.state !== 'disconnected') {
            await util.promisify(connection.end).bind(connection)();
        }
    } catch (err) {
        console.error('Error closing the database connection:', err);
    }
});

