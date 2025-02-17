import { server } from "./servidor.js";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor ligado`);
});