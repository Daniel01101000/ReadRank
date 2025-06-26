import request from "supertest";
import app from "./app.js";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "BooksRank",
  password: "SQL1122",
  port: 3306,
});

describe("API de libros", () => {
  // Solo elimina los libros creados para pruebas (por ejemplo, los de género "Test")
  beforeEach(async () => {
    await pool.query("DELETE FROM books WHERE genero = 'Test'");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("POST /books debería agregar un nuevo libro con rating", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        title: "Libro de prueba",
        author: "Autor de prueba",
        genero: "Test", // Este campo es clave para que sea eliminado en beforeEach
        rating: 8.5,    // Nuevo campo agregado
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Libro de prueba");
    expect(response.body.rating).toBe(8.5); // Verificamos que rating venga en la respuesta
  }, 15000);

  it("GET /books debería devolver un arreglo de libros con rating", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Opcional: verificar que al menos uno tenga rating (si hay libros)
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("rating");
    }
  });
});