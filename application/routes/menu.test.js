const request = require('supertest');
const express = require('express');
const menuRouter = require('./menu');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);
app.use('/menu', menuRouter);

describe('Menu Routes', () => {
    let restaurantID;
    let itemID;

    beforeAll(() => {
        // Set restaurantID for the tests
        restaurantID = 1;
    });

    // test('POST /menu/addMenuItem', async () => {
    //     const menuItem = {
    //         itemName: 'Test Item',
    //         itemDescription: 'Test item description',
    //         itemPrice: 9.99,
    //     };
    //
    //     const res = await request(app)
    //         .post('/menu/addMenuItem')
    //         .send(menuItem)
    //         .set('session', { restaurantID });
    //
    //     expect(res.statusCode).toBe(201);
    //     expect(res.body.message).toBe('Menu item added successfully.');
    // });

    test('GET /menu/returnMenu', async () => {
        const res = await request(app).get(`/menu/returnMenu?restaurantID=${restaurantID}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.menuItems)).toBe(true);

        // Save the itemID of the created item for future tests
        const testItem = res.body.menuItems.find((item) => item.itemName === 'Test Item');
        if (testItem) {
            itemID = testItem.itemID;
        }
    });

    // test('POST /menu/updateMenuItem', async () => {
    //     const updatedMenuItem = {
    //         itemID,
    //         itemName: 'Updated Test Item',
    //         itemPrice: 12.99,
    //         itemDescription: 'Updated test item description',
    //     };
    //
    //     const res = await request(app)
    //         .post('/menu/updateMenuItem')
    //         .send(updatedMenuItem)
    //         .set('session', { restaurantID });
    //
    //     expect(res.statusCode).toBe(201);
    //     expect(res.body.message).toBe('Menu item updated successfully.');
    // });
    //
    // test('POST /menu/deleteMenuItem', async () => {
    //     const res = await request(app)
    //         .post('/menu/deleteMenuItem')
    //         .send({ itemID })
    //         .set('session', { restaurantID });
    //
    //     expect(res.statusCode).toBe(201);
    //     expect(res.body.message).toBe('Menu item deleted successfully.');
    // });
});
