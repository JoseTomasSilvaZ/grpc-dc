# Tarea 1 - Caché distribuido
-------

Para iniciar el proyecto, clónalo en tu máquina

```bash
  git clone https://github.com/JoseTomasSilvaZ/grpc-dc.git
```

Luego, instala las dependencias

```bash
  npm install
```

Inicia la base de datos (requiere el dataset dentro de docker/db-init)

```bash
docker compose -f docker-compose.database.yml up --build
```

Inicia el proyecto de NestJS junto a los nodos de Redis

```bash
docker compose up --build
```