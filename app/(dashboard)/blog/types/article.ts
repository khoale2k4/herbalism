type Article = {
    id: number | null | undefined;
    imageUrl: string;
    title: string;
    categories: string;
    shortDescription: string;
    author: { name: string };
    createdAt: string;
}