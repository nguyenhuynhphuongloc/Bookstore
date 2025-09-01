import * as fs from 'fs';
import * as csv from 'csv-parser';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import * as path from 'path';
// Kết nối MySQL qua TypeORM DataSource
const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'anhmuoi137',
    database: 'bookstores',
    entities: [Book],
    synchronize: true,
});

// Hàm random giá từ 10 -> 500 đô
function randomPrice(min = 10, max = 500) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

async function importCSV() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Book);

    fs.createReadStream(path.join(__dirname, 'books_filtered.csv'))
        .pipe(csv())
        .on('data', async (row) => {
            const input: CreateBookInput = {
                isbn13: row.isbn13,
                isbn10: row.isbn10 || null,
                title: row.title,
                subtitle: row.subtitle || null,
                authors: row.authors,
                categories: row.categories || null,
                thumbnail: row.thumbnail || null,
                description: row.description || null,
                published_year: row.published_year ? Number(row.published_year) : undefined,
                average_rating: row.average_rating ? Number(row.average_rating) : undefined,
                num_pages: row.num_pages ? Number(row.num_pages) : undefined,
                ratings_count: row.ratings_count ? Number(row.ratings_count) : undefined,
                price: randomPrice(),
            };

            // convert DTO sang entity rồi lưu DB
            const book = repo.create(input);
            await repo.save(book);
        })
        .on('end', () => {
            console.log('CSV file successfully processed ✅');
        });
}

importCSV();
