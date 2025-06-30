const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  fs.readFile('count.json', 'utf8', (err, data) => {
    if (err) throw err;
    let countData = JSON.parse(data);
    countData.count += 1;
    fs.writeFile('count.json', JSON.stringify(countData), (err) => {
      if (err) throw err;
      res.send(`Ziyaretçi sayısı: ${countData.count}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});