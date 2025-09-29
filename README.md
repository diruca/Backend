# Backend
Backend By Dídac Ruiz

Nom: Racarplay.com

Pagina Basada en la venda de Radios per a cotxes amb la tecnologia d'Apple Carplay i Android Auto un sistema de mans lliures.

Conexion amb base de dades completada, primer he hagut de configurar el docker-compose.yaml, després he creat un .env per guardar quin és l'usuari i la contrasenya de la base de dades, després configurar el gitignore posant que agafi de referència l'arxiu .env, una vegada fet els arxius obro la terminal de visual studio i escric "docker compose up -d" i per últim he hagut de connectar el contenidor a mongo db posant el local host amb el port del contenidor i ja està feta la base de dades.
