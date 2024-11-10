### Manual Completo para Crear una API en Next.js sin Base de Datos

#### 1. Configuración del Proyecto en Next.js
1. **Crea un nuevo proyecto en Next.js**:
   ```bash
   npx create-next-app@latest todo-api
   cd todo-api
   ```

2. **Instala las dependencias necesarias**:
   No necesitas `mysql2` ni `dotenv` para este ejemplo sin base de datos.

#### 2. Crea un Archivo con los Datos de `todos`
En lugar de utilizar una base de datos, almacenaremos los `todos` directamente en un archivo.

Crea un archivo `src/data/todos.js` con el siguiente contenido:

```javascript
const todos = [
  { id: 1, title: 'Aprender Next.js', completed: true },
  { id: 2, title: 'Construir una API simple', completed: false },
  { id: 3, title: 'Desplegar en Vercel', completed: false },
];

export default todos;
```

#### 3. Crea las Rutas de la API
1. **Crea `src/pages/api/todos/index.js` para manejar las solicitudes `GET`**:
   ```javascript
   import todos from '../../../data/todos';

   export default function handler(req, res) {
     if (req.method === 'GET') {
       res.status(200).json(todos);
     } else {
       res.setHeader('Allow', ['GET']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
     }
   }
   ```

#### 4. Ejecuta tu Proyecto Next.js
Ejecuta tu aplicación en modo desarrollo:
```bash
npm run dev
```

#### 5. Prueba los Endpoints con `cURL`
- **GET para obtener todos los todos**:
   ```bash
   curl http://localhost:3000/api/todos
   ```

#### 6. Despliega tu Aplicación en Vercel
- **Conecta tu repositorio a Vercel**.
- **Haz clic en Deploy** para desplegar la aplicación. No necesitas configurar variables de entorno, ya que los `todos` están en un archivo.

### Conclusión
Este manual te permite crear una API simple en Next.js que maneja los `todos` sin necesidad de una base de datos. Solo se permite realizar la operación `GET` para obtener la lista de `todos`, los cuales están almacenados en un archivo local.

