export const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
};

export const validateOrderInput = (input) => {
    const { beverageId, quantity } = input;
    if (!beverageId || quantity <= 0) {
        throw new Error('Invalid order input: beverageId and quantity must be provided and valid.');
    }
    return true;
};

export const calculateTotalPrice = (beverages, orders) => {
    return orders.reduce((total, order) => {
        const beverage = beverages.find(b => b.id === order.beverageId);
        return total + (beverage ? beverage.price * order.quantity : 0);
    }, 0);
};