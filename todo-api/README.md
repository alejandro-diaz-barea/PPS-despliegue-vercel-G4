### Manual Completo para Crear una API en Next.js con MySQL

#### 1. Configuración del Proyecto en Next.js

1. **Crea un nuevo proyecto en Next.js**:

   ```bash
   npx create-next-app@latest todo-api
   cd todo-api
   ```

2. **Instala las dependencias necesarias**:

   ```bash
   npm install mysql2
   npm install dotenv --save-dev
   ```

#### 2. Configura las Variables de Entorno

Crea un archivo `.env.local` en la raíz de tu proyecto con las credenciales de la base de datos:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=    # Deja vacío si no tienes contraseña
DB_NAME=todo_app
```

#### 3. Crea el Archivo de Conexión a la Base de Datos (`src/libs/db.js`)

```javascript
import mysql from 'mysql2/promise';
import 'dotenv/config'; 

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME, 
  });

  console.log('Conexión a la base de datos exitosa');
  return connection;
}
```

#### 4. Crea las Rutas de la API

1. **Crea ************`src/pages/api/todos/index.js`************ para las solicitudes ************`GET`************ y \*\*\*\*\*\*\*\*****`POST`**:

   ```javascript
   import { getConnection } from '../../../libs/db';

   export default async function handler(req, res) {
     const connection = await getConnection();
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
   ```

2. **Crea ************`src/pages/api/todos/[id].js`************ para las solicitudes ************`PUT`************ y \*\*\*\*\*\*\*\*****`DELETE`**:

   ```javascript
   import { getConnection } from '../../../libs/db';

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
   ```

#### 5. Ejecuta tu Proyecto Next.js

Ejecuta tu aplicación en modo desarrollo:

```bash
npm run dev
```

#### 6. Prueba los Endpoints con `cURL`

- **POST para añadir un todo**:

  ```bash
  curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Nuevo todo"}'
  ```

- **GET para obtener todos los todos**:

  ```bash
  curl http://localhost:3000/api/todos
  ```

- **PUT para actualizar un todo**:

  ```bash
  curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
  ```

- **DELETE para eliminar un todo**:

  ```bash
  curl -X DELETE http://localhost:3000/api/todos/1
  ```

#### 7. Depuración y Problemas Comunes

- **Error "No database selected"**: Asegúrate de que `process.env.DB_NAME` esté correctamente configurada y que tu archivo `.env.local` esté en la raíz del proyecto.
- **Reinicia el servidor de desarrollo** cada vez que hagas cambios en tu archivo `.env.local`:
  ```bash
  npm run dev
  ```

#### 8. Verifica tu Base de Datos Manualmente

Conéctate a tu servidor MySQL y revisa que la base de datos esté creada:

```sql
SHOW DATABASES;
USE todo_app;
SHOW TABLES;
```

###
