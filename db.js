import postgres from 'postgres';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Definir as variáveis de ambiente
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

// Montar a URL de conexão
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

// Criar a instância de conexão
export const sql = postgres(URL, { ssl: 'require' });
