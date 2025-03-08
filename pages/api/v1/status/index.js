import database from "infra/database.js";
import { Query } from "pg";

async function status(request, response) {
  const updated_at = new Date().toISOString();

  const resultVersion = await database.query("SELECT version();");
  const postgres_version = resultVersion.rows[0].version;

  const resultMaxConnections = await database.query("SHOW max_connections");
  const max_connections = resultMaxConnections.rows[0].max_connections;

  const resultUsedConnections = await database.query(
    "SELECT * FROM pg_stat_activity WHERE state = 'activate'",
  );

  response.status(200).json({
    updated_at: updated_at,
    postgres_version: postgres_version,
    max_connections: max_connections,
    result_used_connections: resultUsedConnections,
  });
}

export default status;
