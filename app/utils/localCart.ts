export type ProductInLocalstorage = {
    product: {
        id: string;
        name: string;
        price: number;
        images: {
            url: string;
        }[];
    },
    id: string;
    num: number;
    size: string;
}

export const addProductToLocalCart = (product: ProductInLocalstorage) => {
    const key = 'cart';
    const localCart = localStorage.getItem(key);
    let cart: ProductInLocalstorage[] = localCart ? JSON.parse(localCart) : [];

    const existingIndex = cart.findIndex(
        (p) => p.id === product.id && p.size === product.size
    );

    if (existingIndex !== -1) {
        cart[existingIndex].num += product.num;
        if (cart[existingIndex].num <= 0) {
            cart.splice(existingIndex, 1);
        }
    } else {
        cart.push(product);
    }

    localStorage.setItem(key, JSON.stringify(cart));
};

export const getLocalCart = (): ProductInLocalstorage[] => {
    const key = 'cart';
    const localCart = localStorage.getItem(key);
    try {
        return localCart ? JSON.parse(localCart) as ProductInLocalstorage[] : [];
    } catch (e) {
        console.error('Lỗi khi parse localStorage cart:', e);
        return [];
    }
};

export const cleanCart = () => {
    const key = 'cart';
    localStorage.removeItem(key);
}
