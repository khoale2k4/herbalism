export type Address = {
    id?: number;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    apartment: string;
    // city: string;
    province: string;
    zipCode: string;
};

export const saveLocalAddress = (address: Address) => {
    const key = 'user_address';
    const existing = localStorage.getItem(key);
    let addressList: Address[] = [];

    try {
        addressList = existing ? JSON.parse(existing) as Address[] : [];
    } catch (e) {
        console.error('Lỗi khi parse danh sách địa chỉ:', e);
    }

    const nextId = addressList.length > 0
        ? Math.max(...addressList.map(addr => addr.id ?? 0)) + 1
        : 1;

    const newAddress: Address = {
        ...address,
        id: nextId,
    };

    addressList.push(newAddress);
    localStorage.setItem(key, JSON.stringify(addressList));
};


export const getLocalAddress = (): Address[] => {
    const key = 'user_address';
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) as Address[] : [];
    } catch (e) {
        console.error('Lỗi khi parse địa chỉ từ localStorage:', e);
        return [];
    }
};

