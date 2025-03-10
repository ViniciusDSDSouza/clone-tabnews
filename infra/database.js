// Importa objeto CLient da lib 'pg' (postgre) do Node.js
import { Client } from "pg";

// Define a função query para consultas no banco de dados
async function query(queryObject) {
  // Instancia o Client do PostgreSQL usando as variáveis de ambiente
  const client = new Client({
    host: process.env.POSTGRES_HOST, // Define host do banco de dados
    port: process.env.POSTGRES_PORT, // Define porta do banco de dados
    user: process.env.POSTGRES_USER, // Define nome do usuário do banco de dados
    database: process.env.POSTGRES_DATABASE, // Define o nome do banco de dados 
    password: process.env.POSTGRES_PASSWORD, // Define a senha do banco de dados
  });

  await client.connect(); // Estabelece conexão com o banco de dados
  const result = await client.query(queryObject); // Executa a consulta, onde o parâmetro é a consulta
  await client.end(); // Encerra a conexão com o banco de dados
  return result; // Retorna o resultado da consulta
}

// Exporta objeto com a função de Query
export default {
  query: query,
};
