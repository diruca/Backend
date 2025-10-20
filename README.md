# Backend
Backend By Dídac Ruiz

Nom: Racarplay.com

Pagina Basada en la venda de Radios per a cotxes amb la tecnologia d'Apple Carplay i Android Auto un sistema de mans lliures.

Conexion amb base de dades completada, primer he hagut de configurar el docker-compose.yaml, després he creat un .env per guardar quin és l'usuari i la contrasenya de la base de dades, després configurar el gitignore posant que agafi de referència l'arxiu .env, una vegada fet els arxius obro la terminal de visual studio i escric "docker compose up -d" i per últim he hagut de connectar el contenidor a mongo db posant el local host amb el port del contenidor i ja està feta la base de dades.

Sobre el diagrama entitat relació: 

-- Entitats

Usuari: representa clients i administradors. Té atributs com id, nom, email, contrasenya i rol.

Producte: són les ràdios a la venda. Té id, nom, descripció, preu, stock i compatibilitat (Apple CarPlay o Android Auto).

Comanda: representa una compra feta per un usuari. Té id, idUsuari, data, estat i llista de productes.

Carret: el carret de la compra d’un usuari, on va guardant els productes abans de confirmar la comanda.

Pagament: el registre d’un pagament associat a una comanda. Té mètode, estat i idComanda.

-- Relacions

Usuari – Comanda (1..N): un usuari pot fer moltes comandes, però cada comanda pertany a un sol usuari.

Comanda – Producte (N..M): una comanda pot incloure molts productes i un producte pot aparèixer en moltes comandes.

Usuari – Carret (1..1): cada usuari té un sol carret actiu.

Comanda – Pagament (1..1): cada comanda té un únic pagament associat.

Creació Api:
<img width="470" height="194" alt="image" src="https://github.com/user-attachments/assets/5755065c-8a83-45c6-a394-0e2b92b30e90" />

Sessió 5:

El objectiu es tenir una estructura més definida separat en tres capes (controllers, routes, services)

<img width="777" height="435" alt="image" src="https://github.com/user-attachments/assets/3f87f4fd-33fd-41ec-9d3c-4998a0b3db57" />

Rutes: Defineix els endpoints (/api/products)

Controladors: Maneja peticions HTTP (req/res)

Serveis: Conté la lògica de negoci

<img width="1451" height="303" alt="image" src="https://github.com/user-attachments/assets/c6caec9e-a4c5-4721-8d35-63aaff3696d8" />

<img width="462" height="580" alt="image" src="https://github.com/user-attachments/assets/96fbd91f-b37e-4e19-a344-8e64bfc6e913" />



