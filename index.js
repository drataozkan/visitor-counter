const express = require('express');
const cors = require('cors');      // <-- CORS için ekledik
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());                   // <-- CORS'u global olarak etkinleştir

const filePath = 'count.json';

// Her ziyaretçi geldiğinde sayaç artırılır ve JSON döndürülür
app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Dosya okunamadı' });
    let countData = JSON.parse(data);
    countData.count += 1;
    fs.writeFile(filePath, JSON.stringify(countData), (err) => {
      if (err) return res.status(500).json({ error: 'Dosya yazılamadı' });
      res.json({ count: countData.count });
    });
  });
});

// Sadece sayaç değeri (arttırmadan) görüntülenmek istenirse
app.get('/get', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Dosya okunamadı' });
    let countData = JSON.parse(data);
    res.json({ count: countData.count });
  });
});

app.listen(port, () => {
  console.log(`Sayaç sunucusu aktif: http://localhost:${port}`);
});
