const http = require("http");
const static = require("node-static");
const querystring = require("node:querystring");

const port = process.env.PORT || 5002;

const file = new static.Server("./exercise");

const escapeHtml = (str = "") => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const server = http.createServer((req, res) => {
  // main route
  if (req.method === "GET" && req.url === "/") {
    file.serveFile("/welcome.html", 200, {}, req, res);
  }
  // form route
  else if (req.method === "GET" && req.url === "/form") {
    file.serveFile("/form.html", 200, {}, req, res);
  }
  // form submission
  else if (req.method === "POST" && req.url === "/formExerciseSubmit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const userdata = querystring.parse(body);
      const { usernameInput: name, emailInput: email } = userdata;

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Form Submitted</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
</head>
<body class="bg-primary min-vh-100 d-flex align-items-center justify-content-center">
  <main class="container w-50 p-4 bg-light">
    <h1 class="mb-4 text-center">Thank you for submitting your information</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  </main>
</body>
</html>`);
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
