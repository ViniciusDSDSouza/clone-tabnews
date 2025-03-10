// Define um teste pra conferir status da API
test("Get to /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // Criar uma requisição HTTP
  expect(response.status).toBe(200); // Espera que retorne 200

  const responseBody = await response.json(); // Define o corpo da resposta como um JSON
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Cria uma data para comparar com a data original
  const max_connections = Number(responseBody.max_connections); // Define o número máximo de conexões
  const used_connections = Number(responseBody.used_connections); // Define as conexões usadas

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); // Espera que a data retornada seja igual a criada para comparação
  expect(responseBody.postgres_version).toContain("PostgreSQL"); // Espera que a versão do banco de dados tenha 'PostgreSQL'
  expect(max_connections).toBeGreaterThan(0); // Espera que o máximo de conexões sejam maior que 0
  expect(used_connections).toBeGreaterThan(0); // Espera que as conexões usadas sejam maior que 0
});
