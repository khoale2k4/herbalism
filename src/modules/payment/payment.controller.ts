import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "../response/response.entity";
import { PaymentService } from "./payment.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { OrderService } from "../order/services/order.service";

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly response: Response,
        private readonly paymentService: PaymentService,
        private readonly orderService: OrderService,
    ) { }

    @Post('create-link')
    async createPaymentLink(@Body() dto: CreatePaymentDto, @Res() res) {
        try {
            const link = await this.paymentService.createLink(dto);
            if (!link) {
                this.response.initResponse(false, "Lấy link thanh toán không thành công", link);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            } else {
                this.response.initResponse(true, "Lấy link thanh toán thành công", link);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Post('webhook')
    @HttpCode(200)
    async handleWebhook(@Body() body: any) {
        console.log('Webhook payload:', body);
    
        const { code, success, data, signature } = body;
    
        // Xác thực chữ ký ở đây nếu cần
        if (code === '00' && success && data?.orderCode) {
            await this.orderService.markAsPaid(String(data.orderCode));
        }
    
        return { message: 'ok' };
    }    

    @Post('confirm-webhook')
    async confirmWebhook(@Body() body: { webhookUrl: string }) {
        try {
            const result = await this.paymentService.confirmWebhook(body.webhookUrl);
            return {
                error: 0,
                message: 'ok',
                data: result,
            };
        } catch (error) {
            console.error(error);
            return {
                error: -1,
                message: error.message || 'Unknown error',
                data: null,
            };
        }
    }
}