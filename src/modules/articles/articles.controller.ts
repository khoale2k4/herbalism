import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from '../response/response.entity';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { ArticleService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Readable } from 'stream';
import { cloudinary } from 'src/shared/cdn/cloudinary.config';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly configService: ConfigService,
        private readonly response: Response,
        private readonly articleService: ArticleService
    ) { }

    @Post('upload-image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const streamUpload = (fileBuffer: Buffer): Promise<any> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'herbalism-images',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                Readable.from(fileBuffer).pipe(stream);
            });
        };

        const result = await streamUpload(file.buffer);
        return { url: result.secure_url };
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createNewPost(@Body() dto: CreateArticleDto, @Res() res, @Req() req) {
        try {
            const login = await this.articleService.createArticle(dto, req.user.id);
            this.response.initResponse(true, "Tạo article thành công", login);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get('search/:keyword')
    async searchProductsByKeyword(@Param('keyword') keyword: string, @Req() req, @Res() res) {
        try {
            const products = await this.articleService.searchArticlesByKeyword(keyword);
            this.response.initResponse(true, 'Lấy danh sách bài viết thành công', products);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, 'Đã xảy ra lỗi khi lấy danh sách bài viết', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updatePost(@Body() dto: CreateArticleDto, @Param('id') id: string, @Res() res, @Req() req) {
        try {
            if (req.user.role === 'user') {
                this.response.initResponse(false, 'Người dùng không có quyền truy cập tài nguyên này', null);
                return res.status(HttpStatus.FORBIDDEN).json(this.response);
            }
            const login = await this.articleService.update(dto, id);
            this.response.initResponse(true, "Cập nhật article thành công", login);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get()
    async getAllArticles(@Res() res) {
        try {
            const article = await this.articleService.getAllArticles();
            if (!article) {
                this.response.initResponse(false, "Tìm articles không thành công", article);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            } else {
                this.response.initResponse(true, "Tìm articles thành công", article);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get('categories')
    async getAllCategories(@Res() res) {
        try {
            const article = await this.articleService.getAllCategories();
            if (!article) {
                this.response.initResponse(false, "Tìm categories không thành công", article);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            } else {
                this.response.initResponse(true, "Tìm categories thành công", article);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get(':id')
    async getArticleById(@Param('id') id: string, @Res() res) {
        try {
            const article = await this.articleService.getArticleById(id);
            if (!article) {
                this.response.initResponse(false, "Tìm article không thành công", article);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            } else {
                this.response.initResponse(true, "Tìm article thành công", article);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}
