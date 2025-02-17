import http from "http";
import { URL } from "url";
import { readFileSync } from "fs";
import { readFile } from "fs";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;

  switch (path) {
    case "/teste":
      res.end("Teste");
      break;
    case "/nome":
      const nome = url.searchParams.get("usuario");
      res.end(`Olá pessoa ${nome}`);
      break;
    case "/arquivosync":
      const text = readFileSync("Ex01/texto.txt");
      res.end(text);
      break;
    case "/arquivoasync":
      readFile("Ex01/texto.txt", "utf-8")
        .then((conteudo) => res.end(conteudo))
        .catch((err) => {
          res.statusCode = 500;
          res.end("Erro ao ler o arquivo de forma assíncrona");
        });
      break;
  }
});
