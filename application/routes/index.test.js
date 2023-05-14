const request = require('supertest');
const express = require('express');
const router = require('./index');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Add mock session middleware
app.use((req, res, next) => {
    req.session = {
        user: {
            username: 'testUser'
        }
    };
    next();
});

app.use('/', router);

// The rest of your test code


describe('Routes', () => {
    const routes = [
        '/',
        '/aboutUs',
        '/learnMoreDylan',
        '/learnMoreTim',
        '/learnMoreJeremiah',
        '/learnMoreKevin',
        '/learnMoreWallace',
        '/learnMoreChristian',
        '/login',
        '/signup',
        '/termsOfService',
        '/privacyPolicy',
        '/driver',
        '/driverInfo',
        '/restaurant',
        '/restaurantInfo',
        '/confirmation',
        '/cart',
        '/orderStatus',
        '/manageorder',
        '/restaurantMenuPage',
        '/restaurantAccount',
        '/driverAccount',
        '/userAccount',
        '/help',
        '/notifications',
        '/editUser',
        '/orders',
        '/favorites',
        '/editDriverAccount',
        '/promotions',
        '/checkout'
    ];

    routes.forEach((route) => {
        test(`GET ${route}`, async () => {
            const res = await request(app).get(route);
            expect(res.statusCode).toBe(200);
        });
    });
});
