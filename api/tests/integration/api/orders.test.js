import request from 'supertest';
import app from '../../../src/app'; // Adjust the path if necessary

describe('Order API Integration Tests', () => {
    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                beverageId: 1,
                quantity: 2,
                status: 'pending'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.beverageId).toBe(1);
        expect(response.body.quantity).toBe(2);
        expect(response.body.status).toBe('pending');
    });

    it('should retrieve all orders', async () => {
        const response = await request(app)
            .get('/api/orders');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a specific order by ID', async () => {
        const orderId = 1; // Adjust based on your test data
        const response = await request(app)
            .get(`/api/orders/${orderId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', orderId);
    });

    it('should return 404 for a non-existent order', async () => {
        const response = await request(app)
            .get('/api/orders/9999'); // Assuming 9999 does not exist

        expect(response.status).toBe(404);
    });
});