
export interface Product {
    id: string,
    slug: string,
    name: string,
    price: number,
    rate: number,
    content: string,
    type: Name,
    form: Name,
    need: Name,
    createdAt: string,
    tabs: Tab[],
    size_stock: Size_Stock[],
    images: Image[]
}

type Name = {
    name: string
}

export type Tab = {
    name: string,
    description: string
}

type Size_Stock = {
    size: string,
    stock: number,
    price: number
}

type Image = {
    url: string;
}