import todos
 from "@/data/todos";
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}