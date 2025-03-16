import { OrderController } from '../../../src/controllers/orderController';

describe('OrderController', () => {
    let orderController;

    beforeEach(() => {
        orderController = new OrderController();
    });

    describe('createOrder', () => {
        it('should create a new order and return it', async () => {
            const req = {
                body: {
                    beverageId: 1,
                    quantity: 2,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await orderController.createOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                beverageId: 1,
                quantity: 2,
                status: 'pending',
            }));
        });
    });

    describe('getOrders', () => {
        it('should return a list of orders', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await orderController.getOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });
    });
});