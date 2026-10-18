const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200);
    res.end('ok');
    return;
  }
  res.writeHead(200);
  res.end('vidara');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
