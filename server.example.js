const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basepath, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
      // console.log(data); // buffer
    });

    req.on("end", () => {
      // console.log("End", body.toString().split("=")[1].replaceAll("+", " "));
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
    });

    // res.end("Post success");
    res.end(`Title = ${title}`);
  }

  // console.log("Server!");
  // console.log("method", req.method);
  // console.log("url", req.url);

  // res.end("Hello from server!");
});
