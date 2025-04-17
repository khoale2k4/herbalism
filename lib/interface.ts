
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