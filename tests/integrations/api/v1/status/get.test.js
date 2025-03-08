test("Get to /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  const max_connections = Number(responseBody.max_connections);

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.postgres_version).toContain("PostgreSQL");
  expect(max_connections).toBeGreaterThan(0);
});
