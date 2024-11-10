import { getConnection } from "@/libs/db";

export default async function handler(req, res) {
  const { id } = req.query;
  const connection = await getConnection();

  try {
    if (req.method === 'PUT') {
      const { completed } = req.body;
      await connection.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
      res.status(200).json({ message: 'Task updated successfully' });
    } else if (req.method === 'DELETE') {
      await connection.query('DELETE FROM todos WHERE id = ?', [id]);
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await connection.end();
  }
}
