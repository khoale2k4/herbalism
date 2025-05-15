
export interface AddToCartDto {
    productId: string;
    num: number;
    size: string;
}

export interface CreateCommentDto{
    productId: string;
    content: string;
    rate: number;
}

export interface CreatePaymentDto {
    amount: number;
    orderId: string;
    trackingNumber: string;
}

export interface AddAddressDto {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    apartment?: string;
    // city: string;
    province: string;
    zipCode: string;
}