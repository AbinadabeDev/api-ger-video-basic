import { fastify } from "fastify";
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

//const database = new DatabaseMemory()
const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    const videos = await database.list();
    console.log(videos);

    return reply.status(201).send();
});

server.get('/videos', async (request) => {
    const search = request.query.search;
    const videos = await database.list(search);

    return videos;
});

server.put('/videos/:id', async (request, reply) => {
    try {
        const videoId = request.params.id;
        console.log('Video ID: ', videoId);

        const { title, description, duration } = request.body;
        console.log('Request Body: ', { title, description, duration });

        await database.update(videoId, {
            title,
            description,
            duration,
        });

        return reply.status(204).send();
    } catch (error) {
        console.error('Erro ao atualizar o vídeo: ', error);
        return reply.status(500).send({ error: 'Erro interno no servidor!' });
    }
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
});
