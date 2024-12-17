import { sql } from './db.js';

/* sql `DROP TABLE IF EXISTS videos`.then(() => {
    console.log('Tabela apagada com sucesso!')
}) */

async function createTable() {
    try {
        await sql`
            CREATE TABLE videos (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                duration INTEGER
            );
        `;
        console.log('Tabela criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar tabela:', err.message);
    }
}

createTable();
