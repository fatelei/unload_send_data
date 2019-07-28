const express = require('express')
const fs = require('fs')
const multer = require('multer');
const upload = multer();
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug')

app.get('/collect_data_sync_xmlhttprequest', (req, res) => {
  res.render('xhr_sync');
})

app.post('/collect_data_sync_xmlhttprequest', (req, res) => {
  console.log(req.body)
  res.send('success')
})

app.get('/collect_data_via_image', (req, res) => {
  res.render('img')
})

app.get('/fake_image', (req, res) => {
  console.log(req.query)
  const readableStream = fs.createReadStream('./16x16.png')
  readableStream.on('open', () => {
    res.setHeader('Content-Type', 'image/png')
    readableStream.pipe(res)
  })
})

app.get('/collect_data_via_beacon', (req, res) => {
  res.render('sendbeacon')
})

app.post('/collect_data_via_beacon', upload.none(), (req, res) => {
  console.log(req.body)
  res.send('success')
  res.end()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
