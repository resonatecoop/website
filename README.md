# Resonate Coop website (resonate.coop)

## Tools

### Node.js

[nodejs.org](https://nodejs.org)

### Gulp

```sh
npm install gulp-cli --global
```

### Hugo

[gohugo.io](https://gohugo.io) The world’s fastest framework for building websites

## Development

### Setup

```sh
cd src && \
npm install && \
gulp
```

### Server

```sh
hugo server --config config.toml --baseURL http://localhost:1314 --port 1314
```

## Docker

### Docker compose

```sh
docker-compose -f docker-compose-dev.yml up -d website
```

## Contributors

- Jase <jase@jasecoop.com>
- Alex Crane <alex@resonate.is>
- Augustin Godiscal <auggod@resonate.is>

## See also

[gohugo.io](https://gohugo.io) The world’s fastest framework for building websites

## LICENSE

GPL-3.0-or-later
