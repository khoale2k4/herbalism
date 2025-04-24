import { AddAddressDto, AddToCartDto, CreateCommentDto } from "./interface";

export class AuthOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/auth';
    }

    async login(mail: string, password: string) {
        try {
            const response = await fetch(this.baseUrl + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, password })
            });

            if (!response.ok) {
                throw new Error(`Login failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}

export class CustomerOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/customer';
    }

    async getAddress(token: string) {
        try {
            const response = await fetch(this.baseUrl + '/address', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error(`Get address with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async addAddress(token: string, dto: AddAddressDto) {
        try {
            const response = await fetch(this.baseUrl + '/address', {
                method: 'POST',
                body: JSON.stringify(dto),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error(`Post address failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
    
}

export class ArticleOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/article';
    }

    async getAll() {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get article failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async getById(id: string) {
        try {
            const response = await fetch(this.baseUrl + "/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get article failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}

export class ProductOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/product';
    }

    async getAll() {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get products failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async getById(id: string) {
        try {
            const response = await fetch(this.baseUrl + '/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get products failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async uploadImage(image: File) {
        const api = `${this.baseUrl}/upload-image`;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(api, {
                method: 'POST',
                body: formData
            }
            );

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: "Success",
                data: result.url
            };
        } catch (error: any) {
            console.error('Image upload error:', error);
            return {
                success: false,
                message: "Failed",
                data: null
            };
        }
    }

    async getCategories() {
        try {
            const response = await fetch(this.baseUrl + '/categories/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get article failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: result.success,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}

export class OrderOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/order';
    }

    async getFee() {
        try {
            const response = await fetch(this.baseUrl + '/fee', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Get fee failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async getUnpaid(token: string){
        try {
            const response = await fetch(this.baseUrl + '/unpaid', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error(`Get unpaid orders failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async createFromCart(token: string) {
        try {
            const response = await fetch(this.baseUrl + '/createFromCart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error(`Get unpaid orders failed with status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}

export class CartOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/cart';
    }

    async getMyCartItems(token: string) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
            });
            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data ?? []
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async addToCart(addToCartDto: AddToCartDto, token: string) {
        try {
            const response = await fetch(this.baseUrl + '/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify(addToCartDto)
            });
            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data ?? []
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}

export class CommentOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = (process.env.API_HOST || "http://localhost:3000") + '/comment';
    }

    async checkComment(productId: string, token: string) {
        try {
            const response = await fetch(this.baseUrl + '/isCommented/' + productId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
            });
            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }

    async createComment(dto: CreateCommentDto, token: string) {
        try {
            const response = await fetch(this.baseUrl + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify(
                    { 
                        content: dto.content,
                        rate: dto.rate,
                        productId: dto.productId
                    }
                )
            });
            const result = await response.json();
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Unknown error',
                data: null
            };
        }
    }
}