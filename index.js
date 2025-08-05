const fs = require("fs");
const http = require("http");
const url = require("url");
const os = require("os");

////////////////////////
// File
// const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut =
//   "This is all we know about the avocado :${textIn}.\nCreated on " + Date.now();
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("File written successfully");
// const hello = "Hello World";
// console.log(hello);

////////////////////////
// Server
// console.log(os.cpus().length);
// fs.readFile(`${__dirname}/starter/dev-data/data.json`, "utf-8", (err, data) => {
//   const productData = JSON.parse(data);
// });

// const server = http.createServer((req, res) => {
//   const pathname = req.url;

//   if (pathname === "/" || pathname === "/overview") {
//     res.end("This is the OVERVIEW");
//   } else if (pathname === "/product") {
//     res.end("This is the PRODUCT");
//   } else if (pathname === "/api") {
//     fs.readFile(
//       `${__dirname}/starter/dev-data/data.json`,
//       "utf-8",
//       (err, data) => {
//         const productData = JSON.parse(data);
//         res.writeHead(200, {
//           "Content-type": "application/json",
//         });
//         res.end(data);
//       }
//     );
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
      case "/overview":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>This is the OVERVIEW</h1>");
        break;
      case "/product":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>This is the PRODUCT</h1>");
        break;
      case "/api":
        fs.readFile(
          `${__dirname}/starter/dev-data/data.json`,
          "utf-8",
          (err, data) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal Server Error" }));
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(data);
            }
          }
        );
        return; // Prevents sending another response
      default:
        res.writeHead(404, {
          "Content-Type": "text/html",
          "my-own-header": "hello-world",
        });
        res.end("<h1>Page not found</h1>");
        return; // Prevents sending another response
    }

    // If we reach here, it means no early return was made
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from the server!");
  });
});

server.listen(8000, () => console.log("Server Started"));
