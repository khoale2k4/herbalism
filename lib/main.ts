import { AddToCartDto } from "./interface";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGE2NTk0Yy0xMDU3LTQyZTAtYjdiNi1jYzJjMjI0ZjFhYmYiLCJlbWFpbCI6Imtob2FjdXNAZ21haWwuY29tIiwiaWF0IjoxNzQ0ODcwMjQzLCJleHAiOjE3NDQ5NTY2NDN9.JwXtyWwEJGoy1WIxpIffbSKrDJ26sU1EoI5152NeTRI';

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
        } catch (error) {
            return {
                success: false,
                message: error,
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
        } catch (error) {
            return {
                success: false,
                message: error,
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
        } catch (error) {
            return {
                success: false,
                message: error,
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
        } catch (error) {
            return {
                success: false,
                message: error,
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
        } catch (error) {
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
        } catch (error) {
            return {
                success: false,
                message: error,
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
        } catch (error) {
            return {
                success: false,
                message: error,
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

    async getMyCartItems() {
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
        } catch (error) {
            return {
                success: false,
                message: error,
                data: null
            };
        }
    }

    async addToCart(addToCartDto: AddToCartDto) {
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
        } catch (error) {
            return {
                success: false,
                message: error,
                data: null
            };
        }
    }
}