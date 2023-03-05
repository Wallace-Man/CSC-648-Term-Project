const request = require('supertest');
const app = require('../app');
const router = require('../routes/index');

describe('GET /', () => {
    it('should return 200 OK and render the index page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /aboutUs', () => {
    it('should return 200 OK and render the aboutUs page', async () => {
        const res = await request(app).get('/aboutUs');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreDylan', () => {
    it('should return 200 OK and render the learnMoreDylan page', async () => {
        const res = await request(app).get('/learnMoreDylan');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreTim', () => {
    it('should return 200 OK and render the learnMoreTim page', async () => {
        const res = await request(app).get('/learnMoreTim');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreJeremiah', () => {
    it('should return 200 OK and render the learnMoreJeremiah page', async () => {
        const res = await request(app).get('/learnMoreJeremiah');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreKevin', () => {
    it('should return 200 OK and render the learnMoreKevin page', async () => {
        const res = await request(app).get('/learnMoreKevin');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreWallace', () => {
    it('should return 200 OK and render the learnMoreWallace page', async () => {
        const res = await request(app).get('/learnMoreWallace');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /learnMoreChristian', () => {
    it('should return 200 OK and render the learnMoreChristian page', async () => {
        const res = await request(app).get('/learnMoreChristian');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /login', () => {
    it('should return 200 OK and render the login page', async () => {
        const res = await request(app).get('/login');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /signup', () => {
    it('should return 200 OK and render the signup page', async () => {
        const res = await request(app).get('/signup');
        expect(res.statusCode).toEqual(200);
    });
});

describe('Test the /termsOfService path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/termsOfService');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the /privacyPolicy path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/privacyPolicy');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the /error path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/error');
        expect(response.statusCode).toBe(500);
    });
});

