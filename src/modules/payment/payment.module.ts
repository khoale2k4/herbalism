import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from '../../shared/database/models/customer.model';
import { ResponseModule } from '../response/response.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/shared/database/models/comment.model';
import { Product } from 'src/shared/database/models/product.model';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from '../order/order.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        SequelizeModule.forFeature([]),
        ResponseModule,
        ConfigModule,
        AuthModule,
        OrderModule,
        HttpModule
    ],
    providers: [PaymentService, PaymentController],
    controllers: [PaymentController],
    exports: [PaymentController, PaymentService],
})
export class PaymentModule { }
