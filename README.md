# Resonate Coop website (resonate.coop)

## Tools

### Node.js

[nodejs.org](https://nodejs.org)

### Hugo v0.88.1

[gohugo.io](https://gohugo.io) The world’s fastest framework for building websites

## Development

### Setup

Install [Hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) on your machine.

```sh
cd src && \
npm install -g @babel/cli @babel/core postcss@7.x postcss-cli@7.x && \
npm install
```

### Server

```sh
hugo server --baseURL http://localhost:1314 --environment development --port 1314
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
- Timothée Goguely <timothee@goguely.com>

## See also

[gohugo.io](https://gohugo.io) The world’s fastest framework for building websites

## LICENSE

GPL-3.0-or-later
