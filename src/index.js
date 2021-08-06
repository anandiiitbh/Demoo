var http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log(JSON.parse(data));
        save(data, res);
        res.end();
      });
    }
    if (req.method === "GET") {
      send(res);
      res.end();
    }
  })
  .listen(PORT);

async function save(data, res) {
  let items = JSON.parse(fs.readFileSync("src/data.json"));
  res.write(JSON.stringify(items));
  if (data) {
    items.push(JSON.parse(data));
    fs.writeFileSync("src/data.json", JSON.stringify(items)); //Writing New DashCam to DashCam List
  }
}

async function send(res) {
  let items = JSON.parse(fs.readFileSync("src/data.json"));
  res.write(JSON.stringify(items));
}
