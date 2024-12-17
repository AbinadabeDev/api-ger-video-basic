    import postgres from 'postgres';
    import { randomUUID } from 'crypto';
    import dotenv from 'dotenv';

    dotenv.config(); // Carrega as variáveis do .env

    export class DatabasePostgres {
        constructor() {
            this.sql = postgres({
                host: process.env.PGHOST,
                port: process.env.PGPORT,
                database: process.env.PGDATABASE,
                username: process.env.PGUSER,
                password: process.env.PGPASSWORD,
                ssl: true,
            });
        }

        async list(search) {
            let videos;

            if (search) {
                videos = await this.sql`
                    SELECT * FROM videos WHERE title ILIKE ${`%${search}%`}
                `;
            } else {
                videos = await this.sql`
                    SELECT * FROM videos
                `;
            }

            return videos;
        }

        async create(video) {
            const videoId = randomUUID();
            const { title, description, duration } = video;

            await this.sql`
                INSERT INTO videos (id, title, description, duration)
                VALUES (${videoId}, ${title}, ${description}, ${duration})
            `;
        }

        async update(videoId, video) {
            const { title, description, duration } = video;

            await this.sql`
                UPDATE videos
                SET title = ${title}, description = ${description}, duration = ${duration}
                WHERE id = ${videoId}
            `;
        }

        async delete(videoId) {
            await this.sql`
                DELETE FROM videos WHERE id = ${videoId}
            `;
        }
    }
