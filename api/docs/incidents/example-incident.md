# Documentació d'Incidències Observables

Aquest document exemplifica com s'utilitzen els nous pilars d'observabilitat (Request ID, structured logs i el middleware d'errors) per rastrejar i solucionar problemes al backend.

---

## Incidència: Error de Prova Simulada en Desenvolupament

### 1. Símptomes
Un usuari o un servei automàtic de monitoratge detecta un error de tipus `500` (Internal Server Error) en realitzar una petició de depuració.

**Resposta de l'API:**
```json
{
  "message": "Error de prova per observabilitat",
  "requestId": "5efb3192-30ab-48d6-a262-b9b531ca1188"
}
```

---

### 2. Investigació i Traçabilitat (Ús del Request ID)
Mitjançant el valor `requestId` retornat en la resposta HTTP (`5efb3192-30ab-48d6-a262-b9b531ca1188`), filtrem els logs de l'aplicació per veure tota la seqüència:

1. **Log d'entrada HTTP (pino-http):**
   ```json
   {
     "level": 30,
     "time": "2026-05-21 17:28:45.123",
     "msg": "GET /api/debug/error completed with status 500",
     "req": {
       "id": "5efb3192-30ab-48d6-a262-b9b531ca1188",
       "method": "GET",
       "url": "/api/debug/error",
       "headers": {
         "x-request-id": "5efb3192-30ab-48d6-a262-b9b531ca1188"
       }
     },
     "res": {
       "statusCode": 500
     },
     "responseTime": 12
   }
   ```

2. **Log d'Error no controlat (errorHandler.js):**
   ```json
   {
     "level": 50,
     "time": "2026-05-21 17:28:45.124",
     "requestId": "5efb3192-30ab-48d6-a262-b9b531ca1188",
     "message": "Error de prova per observabilitat",
     "stack": "Error: Error de prova per observabilitat\n    at c:\\Users\\didac\\Desktop\\Framework_RuizDídac\\backendaw\\api\\src\\index.js:60:8\n    at Layer.handle [as handle_request] (c:\\Users\\didac\\Desktop\\Framework_RuizDídac\\backendaw\\api\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (c:\\Users\\didac\\Desktop\\Framework_RuizDídac\\backendaw\\api\\node_modules\\express\\lib\\router\\route.js:144:13)...",
     "msg": "Unhandled error"
   }
   ```

---

### 3. Diagnòstic i Resolució
* **Causa arrel:** S'ha cridat a l'endpoint `/api/debug/error`, el qual llança explícitament un error de prova utilitzant `next(new Error(...))`.
* **Solució:** L'error és simulat i controlat correctament pel nostre middleware global. No cal cap acció addicional ja que és una ruta de desenvolupament, la qual s'ha d'eliminar abans de desplegar a producció.
