import { IsOptional } from "class-validator";

export class CreateOrderFromCartDto {
    customerId: string;
    addressId: string;
    voucherId?: string;
    note?: string;
    paymentMethod: 'cod' | 'bank';
}