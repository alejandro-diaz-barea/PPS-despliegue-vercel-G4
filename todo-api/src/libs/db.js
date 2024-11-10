import mysql from 'mysql2/promise';

// Función para establecer la conexión con la base de datos
export async function getConnection() {
    console.log("prueba")
    console.log(process.env.DB_HOST)

  try {
    // Crea la conexión utilizando las variables de entorno
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,   
    });

    console.log('Conexión a la base de datos exitosa');

    // Verifica y crea la tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `);

    return connection;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    throw error;
  }
}
