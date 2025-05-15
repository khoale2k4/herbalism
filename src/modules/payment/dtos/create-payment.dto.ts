export interface CreatePaymentDto {
    amount: number;
    orderId: string;
    trackingNumber: string;
}