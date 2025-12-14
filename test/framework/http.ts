/* oxlint-disable no-console */

import { serve } from "bun";

const server = serve({
  port: 5000,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    console.write(`${req.method} ${path}${url.search}\n`);
    return new Response(Bun.file(`dist${path === "/" ? "/index.html" : path}`));
  },
});

console.info("listening on", server.url.href);
