# 🌟 Tarea 1 - Caché distribuido

### Instalación
Para iniciar el proyecto, clónalo en tu máquina

```bash
  git clone https://github.com/JoseTomasSilvaZ/grpc-dc.git
```

Luego, instala las dependencias

```bash
  npm install
```
### Iniciación

Inicia la base de datos (requiere el dataset dentro de docker/db-init)

```bash
docker compose -f docker-compose.database.yml up --build
```

Inicia el proyecto de NestJS junto a los nodos de Redis

```bash
docker compose up --build
```

### Métricas
Las métricas fueron realizadas con un script de python, puedes encontrar la repo [acá](https://github.com/JoseTomasSilvaZ/grpc-dc-tests)


### Disclaimer
Para el setup de docker compose de caché particionado, se utilizó código planteado por @brunojppb, en [este repo](https://github.com/brunojppb/redis-cluster-demo/blob/main/redis/entrypoint.sh) 
