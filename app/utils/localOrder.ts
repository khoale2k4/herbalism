export const addOrderToLocal = (orderId: string) => {
    const key = 'orders';
    const localOrders = localStorage.getItem(key);
    let orderIds: string[] = localOrders ? JSON.parse(localOrders) : [];

    const existingIndex = orderIds.findIndex(
        (o) => o === orderId
    );

    if (existingIndex !== -1) {
    } else {
        orderIds.push(orderId);
    }

    localStorage.setItem(key, JSON.stringify(orderIds));
};

export const getOrders = (): string[] => {
    const key = 'orders';
    const localOrders = localStorage.getItem(key);
    return localOrders ? JSON.parse(localOrders) : [];
}