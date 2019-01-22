const http = require('http');
const hostname = '127.0.0.1';
const port = 3001;
const fs = require ('fs')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('JSON data in terminal');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const csvFilePath='./customer-data.csv'
const csv=require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log('Converting to JSON...');

    var data_json = JSON.stringify({data: jsonObj})

    fs.writeFile('./data.json', data_json, (err) => {
    if (err) throw err;
    });

    fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.data.forEach(i => console.log(i.id))
  });
});
