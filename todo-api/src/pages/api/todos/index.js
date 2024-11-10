import { getConnection } from "@/libs/db";
import 'dotenv/config'; // Asegúrate de cargar dotenv si necesitas las variables de entorno

export default async function handler(req, res) {
  const connection = await getConnection();

    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_NAME:', process.env.DB_NAME);

  try {
    if (req.method === 'GET') {
      const [rows] = await connection.query('SELECT * FROM todos');
      res.status(200).json(rows);
    } else if (req.method === 'POST') {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
      await connection.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false]);
      res.status(201).json({ message: 'Task added successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await connection.end();
  }
}
