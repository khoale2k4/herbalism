import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UUID } from 'crypto';
import { Article } from 'src/shared/database/models/article.model';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { Admin } from 'src/shared/database/models/admin.model';
import { ArticleCategory } from 'src/shared/database/models/article-category.model';
import { Op, Sequelize, where } from 'sequelize';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article) private readonly articleModel: typeof Article,
        @InjectModel(ArticleCategory) private readonly categoryModel: typeof ArticleCategory
    ) { }

    async createArticle(articleData: CreateArticleDto, adminId: string) {
        let category = await this.getCategoryByName(articleData.category);
        if (!category) {
            category = await this.createCategory(articleData.category);
        }
        const article = await this.articleModel.create({
            ...articleData,
            imageUrl: articleData.images[0],
            adminId,
            categoryId: category.id
        });
        return article;
    }

    async update(articleData: CreateArticleDto, articleId: string) {
        const [updatedCount] = await this.articleModel.update(
            {
                ...articleData,
                imageUrl: (articleData.images.length > 0 ? articleData.images[0] : "")
            }, {
            where: {
                id: articleId
            }
        })

        if (updatedCount === 0) {
            throw new Error('Article not found or no changes detected');
        }
        return await this.getArticleById(articleId);
    }

    async delete(articleId: string) {
        const article = await this.articleModel.findByPk(articleId);
        if(article) {
            await this.articleModel.destroy({
                where: {
                    id: articleId
                }
            })
            return article;
        }
        return null;
    }

    async getAllArticles() {
        return this.articleModel.findAll({
            attributes: ['id', 'title', 'imageUrl', 'shortDescription', 'createdAt'],
            include: [{
                model: Admin,
                as: 'author',
                attributes: ['name'],
                required: false
            }, {
                model: ArticleCategory,
                as: 'category',
                attributes: ['name'],
                required: false
            },],
            order: [
                ['createdAt', 'DESC'],
            ]
        });
    }

    async getArticleById(id: string) {
        const article = await this.articleModel.findOne(
            {
                where: { id },
                include: [{
                    model: Admin,
                    as: 'author',
                    attributes: ['name'],
                    required: false
                },],
            });
        return article;
    }

    async getAllCategories() {
        return this.categoryModel.findAll();
    }

    async getCategoryByName(name: string) {
        const category = await this.categoryModel.findOne(
            {
                where: { name }
            });
        return category;
    }

    async createCategory(name: string) {
        const category = await this.categoryModel.create(
            { name }
        );
        return category;
    }

    async searchArticlesByKeyword(keyword: string) {
        if (!keyword || keyword.trim() === '') return [];

        const lowerKeyword = `%${keyword.toLowerCase()}%`;

        const articles = await Article.findAll({
            attributes: ['id', 'title', 'imageUrl', 'shortDescription', 'createdAt'],
            where: {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Article.title')), {
                        [Op.like]: lowerKeyword
                    }),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Article.shortDescription')), {
                        [Op.like]: lowerKeyword
                    }),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Article.content')), {
                        [Op.like]: lowerKeyword
                    }),
                ]
            },
            include: [
                {
                    model: Admin,
                    as: 'author',
                    attributes: ['name'],
                    required: false
                },
                {
                    model: ArticleCategory,
                    as: 'category',
                    required: false,
                    where: {
                        [Op.or]: [
                            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category.name')), {
                                [Op.like]: lowerKeyword
                            }),
                        ]
                    }
                }
            ]
        });

        return articles;
    };
}
