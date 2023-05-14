const request = require('supertest');
const express = require('express');
const session = require('express-session');
const router = require('./restaurants');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const mockQueryResults = {
    getRestaurants: [],
    getCuisineType: [],
    getAllRestaurants: [],
    createRestaurant: { insertId: 1 },
    login: { restaurantID: 1, password: bcrypt.hashSync('testpassword', 10) },
};

jest.mock('mysql', () => ({
    createConnection: () => ({
        connect: () => {},
        query: (query, params, callback) => {
            if (query.includes('LIKE')) {
                callback(null, mockQueryResults.getRestaurants);
            } else if (query.includes('cuisine_type')) {
                callback(null, mockQueryResults.getCuisineType);
            } else if (query.includes('SELECT * FROM Restaurant')) {
                callback(null, mockQueryResults.getAllRestaurants);
            } else if (query.includes('INSERT INTO Restaurant')) {
                callback(null, mockQueryResults.createRestaurant);
            } else if (query.includes('SELECT restaurantID, password FROM Restaurant')) {
                callback(null, [mockQueryResults.login]);
            } else {
                callback(null, []);
            }
        },
    }),
}));

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/', router);

describe('Restaurant Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // test('GET /getRestaurants', async () => {
    //     const res = await request(app).get('/getRestaurants?searchTerm=test');
    //     expect(res.statusCode).toBe(200);
    //     expect(Array.isArray(res.body)).toBeTruthy();
    // });
    //
    // test('GET /getCuisineType', async () => {
    //     const res = await request(app).get('/getCuisineType?searchTerm=test');
    //     expect(res.statusCode).toBe(200);
    //     expect(Array.isArray(res.body)).toBeTruthy();
    // });
    //
    // test('GET /getAllRestaurants', async () => {
    //     const res = await request(app).get('/getAllRestaurants');
    //     expect(res.statusCode).toBe(200);
    //     expect(Array.isArray(res.body)).toBeTruthy();
    // });

    test('POST /restaurant', async () => {
        const mockData = {
            address: '123 Test St',
            city: 'Test City',
            state: 'TS',
            country: 'Test Country',
            zip: '12345',
            name: 'Test Restaurant',
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
            phone: '1234567890',
            website: 'https://test.com',
            open: '10:00',
            close: '22:00',
            deliveryTime: '30',
            cuisine: 'Test Cuisine',
        };

        const res = await request(app)
            .post('/restaurant')
            .send(mockData);

        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/');
    });

    test('POST /restaurant/login', async () => {
        const mockData = {
            username: 'testuser',
            password: 'testpassword',
        };

        const res = await request(app)
            .post('/restaurant/login')
            .send(mockData);

        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/');
    });
});
