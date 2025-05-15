import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "src/shared/database/models/comment.model";
import { Product } from "src/shared/database/models/product.model";
import { where } from "sequelize";
import PayOS from "@payos/node";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { ConfigService } from "@nestjs/config";
import { OrderService } from "../order/services/order.service";

@Injectable()
export class PaymentService {
    private payos: PayOS;
    private returnUrl: string;
    private cancelUrl: string;
    constructor(
        // @InjectModel(Comment) private readonly commentModel: typeof Comment,
        // @InjectModel(Product) private readonly productModel: typeof Product
        private readonly orderService: OrderService,
        private readonly configService: ConfigService,
    ) {
        const clientId = this.configService.get<string>('PAYOS_CLIENT_ID') ?? "";
        const apiKey = this.configService.get<string>('PAYOS_API_KEY') ?? "";
        const checksum = this.configService.get<string>('PAYOS_CHECKSUM_KEY') ?? "";
        this.payos = new PayOS(clientId, apiKey, checksum);
        this.returnUrl = this.configService.get<string>('RETURN_URL') ?? "";
        this.cancelUrl = this.configService.get<string>('CANCEL_URL') ?? "";
    }

    async createLink(dto: CreatePaymentDto) {
        const orderCode = Date.now(); // hoặc order.id
        await this.orderService.assignOrderCode(dto.orderId, orderCode.toString());
        try {
            const paymentLinkRes = await this.payos.createPaymentLink({
                orderCode,
                amount: dto.amount,
                description: `#${dto.trackingNumber}`,
                returnUrl: `${this.returnUrl}?orderId=${dto.orderId}`,
                cancelUrl: `${this.cancelUrl}`,
            });
            return paymentLinkRes.checkoutUrl;
        } catch (error: any) {
            console.error('PayOS Error:', error.response?.data || error.message);
            throw error;
        }
    }
}