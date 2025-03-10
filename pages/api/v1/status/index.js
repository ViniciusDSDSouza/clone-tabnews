// Importa o módulo de acesso ao banco de dados
import database from "infra/database.js";

// Importa a classe Query do banco de dados (PostgreSQL), para consultas mais detalhadas
import { Query } from "pg";

// Função assincrona responsável pelas requests e responses da API
async function status(request, response) {
  const updated_at = new Date().toISOString(); // Data atual no formato ISO

  const resultVersion = await database.query("SELECT version();"); // Query (JSON) da versão do PostgreSQL
  const postgres_version = resultVersion.rows[0].version; // Versão PostgreSQL extraída da Query

  const resultMaxConnections = await database.query("SHOW max_connections"); // Query (JSON) máximo de conexões
  const max_connections = resultMaxConnections.rows[0].max_connections; // Máximo de conexões extraída da Query

  const resultUsedConnections = await database.query(
    "SELECT COUNT (*) FROM pg_stat_activity WHERE state = 'active'", // Query (JSON) conexões ativas
  );
  const used_connections = resultUsedConnections.rows[0].count; // Conexões usadas extraídas da Query

  // Resposta JSON com as informações
  // Status HTTP 200 indica sucesso
  response.status(200).json({
    updated_at: updated_at, // Data atual
    postgres_version: postgres_version, // Versão PostgreSQL
    max_connections: max_connections, // Conexões máximas
    used_connections: used_connections, // Conexões usadas
  });
}

// Exporta a função pra ser usada em outro arquivo
export default status;
