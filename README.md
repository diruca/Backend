# Backend
Backend By Dídac Ruiz

Nombre: Racarplay.com

Pagina Basada en la venta de Radios para coches con la tecnologia de Apple Carplay y Android Auto un sistema de manos libres.

Conexion con base de datos completada, primero he tenido que configurar el docker-compose.yaml, luego he creado un .env para guardar cual es el usuario y la contraseña de la base de datos, luego configurar el gitignore poniendo que coja de referencia el archivo .env, una vez hecho los archivos abro la terminal de visual studio y escribo "docker compose up -d" con eso creo un contenedor y una imagen en docker y por ultimo he tenido que conectar el contenedor en mongo db poniendo el local host con el puerto del contenedor y ya esta hecha la base de datos.
