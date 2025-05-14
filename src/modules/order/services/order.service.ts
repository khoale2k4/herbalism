
import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../../shared/database/models/customer.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { UUID } from 'crypto';
import { AdminService } from '../../admin/admin.service';
import { CartItem } from 'src/shared/database/models/cart-item.model';
import { Order } from 'src/shared/database/models/order.model';
import { CreateOrderForGuestDto, OrderItemDto } from '../dtos/create-order-for-guest.dto';
import { Product } from 'src/shared/database/models/product.model';
import { SizeStock } from 'src/shared/database/models/size_stock.model';
import { Cart } from 'src/shared/database/models/cart.model';
import { CartService } from '../../cart/cart.service';
import { OrderDetail } from 'src/shared/database/models/order-detail.model';
import { FeeService } from './fee.service';
import { CreateOrderFromCartDto } from '../dtos/create-order-from-cart.dto';
import { ProductService } from 'src/modules/product/services/product.service';
import { Sequelize } from 'sequelize-typescript';
import { ProductImages } from 'src/shared/database/models/product-image.dto';
import { Address } from 'src/shared/database/models/address.model';
import { VoucherService } from 'src/modules/voucher/voucher.service';
import { MailService } from 'src/modules/mail/mail.service';
import { Transaction } from 'sequelize';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private readonly orderModel: typeof Order,
        @InjectModel(Customer) private readonly customerModel: typeof Customer,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
        @InjectModel(Address) private addressModel: typeof Address,
        @InjectModel(OrderDetail) private readonly orderDetailModel: typeof OrderDetail,
        @InjectModel(SizeStock) private readonly sizeStockModel: typeof SizeStock,
        @InjectConnection() private readonly sequelize: Sequelize,
        private readonly cartService: CartService,
        private readonly feeService: FeeService,
        private readonly productService: ProductService,
        private readonly voucherService: VoucherService,
        private readonly mailService: MailService
    ) {
    }

    async cancel(id: string) {
        const order = await this.getById(id);

        if (!order) {
            throw Error("Order not found");
        }

        await this.orderModel.update({
            ...order,
            status: 'cancelled'
        }, {
            where: {
                id
            }
        })
        return order;
    }

    async complete(id: string) {
        const order = await this.getById(id);

        if (!order) {
            throw Error("Order not found");
        }

        await this.orderModel.update({
            ...order,
            status: 'delivered'
        }, {
            where: {
                id
            }
        })
        return order;
    }

    async ship(id: string) {
        const order = await this.getById(id);

        if (!order) {
            throw Error("Order not found");
        }

        await this.orderModel.update({
            ...order,
            status: 'shipped'
        }, {
            where: {
                id
            }
        })
        return order;
    }

    async getMyOrders(userId: string) {
        return await this.orderModel.findAll({
            where: {
                customerId: userId
            },
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'name', 'mail'],
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
                {
                    model: Address,
                }
            ],
        });
    }

    async getAll() {
        return await this.orderModel.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'name', 'mail'],
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });
    }

    formatAddress(address: Address) {
        const parts = [
            address.apartment,
            address.address,
            address.city,
            address.province,
            address.zipCode,
            address.country
        ];

        return parts.filter(Boolean).join(', ');
    }

    async getMailBody(order: Order, isGuest = false, transaction?: Transaction) {
        const orderDate = new Date(order.createdAt).toLocaleDateString("vi-VN");
        const address = await this.addressModel.findOne({
            where: {
                id: order?.get('addressId')
            },
            transaction
        });
        console.log(address?.dataValues);
        const shippingAddress = address ? this.formatAddress(address?.dataValues) : 'Không có địa chỉ';


        return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <title>Thông báo đơn hàng</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f6f9fc;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .header {
          text-align: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 16px;
        }
        .header h2 {
          color: #1e40af;
        }
        .order-info {
          margin-top: 20px;
        }
        .order-info h3 {
          color: #111827;
        }
        .order-info p {
          color: #4b5563;
          margin: 6px 0;
        }
        .footer {
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
          margin-top: 30px;
        }
        .btn {
          display: inline-block;
          margin-top: 20px;
          background-color: #1d4ed8;
          color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Cảm ơn bạn đã đặt hàng!</h2>
          <p>Đơn hàng của bạn đã được tạo thành công.</p>
        </div>
    
        <div class="order-info">
          <h3>Thông tin đơn hàng</h3>
          <p><strong>Mã đơn hàng:</strong> #${order?.get('trackingNumber')?? "Không có thông tin"}</p>
          <p><strong>Ngày đặt:</strong> ${orderDate}</p>
          <p><strong>Tên khách hàng:</strong> ${order?.get('firstName')?? "" + order?.get('lastName')?? ""}</p>
          <p><strong>Số điện thoại:</strong> ${order?.get('phone')?? "Không có thông tin"}</p>
          <p><strong>Địa chỉ giao hàng:</strong> ${shippingAddress}</p>
          <p><strong>Phương thức thanh toán:</strong> ${order?.get('paymentMethod')?? "Không có thông tin"}</p>
          <p><strong>Tổng sản phẩm:</strong> ${order?.get('totalPrice')?? "Không có thông tin"}₫</p>
          <p><strong>Tiền ship:</strong> ${order?.get('shippingFee')?? "Không có thông tin"}₫</p>
        </div>
    
        <div class="footer">
          © 2025 Herbalism. Mọi thắc mắc xin liên hệ hỗ trợ khách hàng.
        </div>
      </div>
    </body>
    </html>
        `;
    }

    async createOrderForGuest(dto: CreateOrderForGuestDto) {
        return await this.sequelize.transaction(async (t) => {
            const address = await this.addressModel.create({
                ...dto.address, 
                customerId: 'guest-id',
                city: ''
            }, { transaction: t });
            const { itemPrices, products } = await this.validateItemsAndCalculateTotal(dto.items, t);

            const subtotal = itemPrices.reduce((total, price) => total + price, 0);
            let totalPrice = subtotal;
            if (dto.voucherId !== undefined) {
                const voucher = await this.voucherService.findById(dto.voucherId);
                console.log(voucher)
                if (voucher) {
                    console.log(voucher.discount)
                    if (voucher.type === 'amount') {
                        totalPrice -= voucher.discount;
                    } else if (voucher.type === 'percent') {
                        totalPrice -= (voucher.discount * totalPrice);
                    }
                    totalPrice = (totalPrice < 0 ? 0 : totalPrice);
                }
            }
            const fee = this.feeService.calculateFee(subtotal);

            const trackingNumber = await this.getTrackingNumber();
            const order = await this.orderModel.create({
                customerId: 'guest-id',
                status: 'pending',
                totalPrice: totalPrice,
                shippingFee: fee,
                addressId: address.id,
                note: dto.note,
                phone: dto.address.phone,
                email: dto.address.email,
                trackingNumber: trackingNumber,
                paymentMethod: dto.paymentMethod
            }, { transaction: t });
            if (dto.address && dto.address.email) {
                await this.mailService.sendMail(dto.address.email, "Order #" + trackingNumber, await this.getMailBody(order, true, t));
            }

            await Promise.all(dto.items.map(async (item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }
                await this.orderDetailModel.create({
                    orderId: order.id,
                    productId: product.id,
                    size: item.size,
                    num: item.quantity,
                    price_at_order: product.price,
                }, { transaction: t });

                await this.sizeStockModel.decrement('stock', {
                    by: item.quantity,
                    where: { productId: product.id, size: item.size },
                    transaction: t
                });
            }));

            return order;
        });
    }

    private async validateItemsAndCalculateTotal(items: OrderItemDto[], transaction) {
        const itemPrices: number[] = [];
        const products: Product[] = [];

        for (const item of items) {
            const product = await this.productModel.findOne({
                where: { id: item.productId },
                include: [{
                    model: SizeStock,
                    where: { size: item.size },
                    as: 'size_stock'
                }],
                transaction
            });

            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }

            const productPlain = product.get?.({ plain: true }) || product;
            const sizeStock = productPlain.size_stock?.[0];

            if (!sizeStock) {
                throw new Error(`Size ${item.size} not available for product ${item.productId}`);
            }

            if (sizeStock.stock < item.quantity) {
                throw new Error(`Not enough stock for product ${item.productId} (size ${item.size})`);
            }

            products.push(productPlain);
            itemPrices.push(sizeStock.price * item.quantity);
        }

        return { itemPrices, products };
    }

    async createOrderFromCart(dto: CreateOrderFromCartDto) {
        const items = await this.cartService.getItemsInCart(dto.customerId);
        if (!items || items.length === 0) {
            throw new Error('No items in cart');
        }
        console.log(items);
        const itemPrices = await Promise.all(
            items.map(async (item) => {
                const productId = item.get('product').get('id');
                const size = item.get('size');
                const num = item.get('num');
                const product = await this.productModel.findOne({
                    where: { id: productId },
                    include: [{
                        model: SizeStock,
                        where: { size: size },
                        as: 'size_stock'
                    }]
                });

                if (!product) {
                    throw new Error(`Product ${productId} not found`);
                }

                const productSizeStock = await this.productService.getSizeStockOfProduct(productId, size);
                const productSize = productSizeStock as SizeStock;
                console.log('productSize', productSize)
                if (!productSize) {
                    throw new Error(`Product Size ${productId}, ${size} not found`);
                }
                if (productSize.stock < num) {
                    throw new Error(`Not enough stock for product ${productId}`);
                }

                const productPlain = product.get?.({ plain: true }) || product;
                return productPlain.price * num;
            })
        );
        const totalPrice = itemPrices.reduce((total, price) => total + price, 0);
        let finalPrice = totalPrice;
        const fee = this.feeService.calculateFee(totalPrice);
        console.log(finalPrice);
        if (dto.voucherId !== undefined) {
            const voucher = await this.voucherService.findById(dto.voucherId);
            console.log(voucher)
            if (voucher) {
                console.log(voucher.discount)
                if (voucher.type === 'amount') {
                    finalPrice -= voucher.discount;
                } else if (voucher.type === 'percent') {
                    finalPrice -= (voucher.discount * finalPrice);
                }
                finalPrice = (finalPrice < 0 ? 0 : finalPrice);
            }
            console.log(finalPrice);
        }
        const trackingNumber = await this.getTrackingNumber();
        const order = await this.orderModel.create({
            customerId: dto.customerId,
            addressId: dto.addressId,
            totalPrice: finalPrice,
            note: dto.note,
            shippingFee: fee,
            status: 'pending',
            trackingNumber: trackingNumber,
            paymentMethod: dto.paymentMethod
        });
        const cus = await this.customerModel.findByPk(dto.customerId);
        await this.mailService.sendMail(cus?.mail ?? "", "Order #" + trackingNumber, await this.getMailBody(order));
        items.map(async item => {
            const product = item.get('product');
            const num = item.get('num');
            console.log('size', item.get('size'));
            await this.orderDetailModel.create({
                orderId: order.id,
                productId: product.get('id'),
                size: item.get('size'),
                num: num,
                price_at_order: product.get('price'),
            });
            await this.sizeStockModel.decrement('stock', {
                by: num,
                where: { productId: product.get('id'), size: item.get('size') }
            });
        });
        await this.cartService.clearCart(dto.customerId);
        return order;
    }

    async getPendingOrders(customerId: string) {
        return await this.orderModel.findAll({
            where: {
                status: 'pending',
                customerId
            },
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'name', 'mail'],
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                            include: [{
                                model: ProductImages,
                                attributes: ['url'],
                            }]
                        },
                    ],
                },
            ],
        });
    }

    async getTrackingNumber() {
        const orders = await this.orderModel.count();
        const orderNumber = orders.toString().padStart(7, '0');
        const time = new Date();
        const formattedDate = time.toISOString().slice(0, 10).replace(/-/g, '');
        const trackingNumber = `ORDER_${orderNumber}_${formattedDate}`;

        return trackingNumber;
    }

    async getById(id: string) {
        return await this.orderModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'name', 'mail'],
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
                {
                    model: Address,
                }
            ],
        })
    }

    async getByTrackingNumber(number: string) {
        return await this.orderModel.findOne({
            where: {
                trackingNumber: number
            }
        });
    }
}