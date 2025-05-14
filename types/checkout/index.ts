export type Address = {
    id: string;
    address: string;
    apartment?: string;
    province: string;
    firstName: string;
    lastName: string;
    // city: string;
    country: string;
    zipCode: string;
}

export type Voucher = {
    id: string;
    discount: number;
    type: string;
}

export type CardPayment = {
    number: string;
    cvc: string;
    date: string;
    name: string;
}

export type MomoPayment = {}
export type PaypalPayment = {}
export type CodPayment = {}
export type BankPayment = {}

export type PaymentMethod = {
    id: string;
    name: string;
    icon: string;
}

export type ItemInCart = {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    num: number;
}

export type CheckoutFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressId: string;
    address: string;
    apartment: string;
    province: string;
    // city: string;
    country: string;
    zipCode: string;
    paymentMethod: string;
}