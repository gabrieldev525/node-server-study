const http = require('http')
const fs = require('fs')
const host = '127.0.0.1'
const port = 3000

const setContentType = (req, res) => {
  let extension = req.url.split('.')
  if(extension.length > 1) {
    extension = extension[extension.length - 1]
    const image_extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg']

    if(extension == 'css')
      res.setHeader('Content-Type', 'text/css')
    else if(extension == 'html')
      res.setHeader('Content-Type', 'text/html')
    else if(image_extensions.indexOf(extension) != -1)
      res.setHeader('Content-Type', `image/${extension}`)
    else
      res.setHeader('Content-Type', 'text/plain')
  } else
    res.setHeader('Content-Type', 'text/html')
}

const server = http.createServer((req, res) => {
  let file = req.url == '/' ? '/index.html' : req.url

  // check if the file requisited exists, and case don't find, return 404 error
  if(!fs.existsSync(`./static${file}`)) {
    res.statusCode = 404
    file = '/404.html'
  } else {
    res.statusCode = 200
  }

  fs.readFile(`./static${file}`, (err, data) => {
    setContentType(req, res)

    if(err) {
      res.statusCode = 500
      res.end('Erro no servidor')
    } else {
      res.write(data)
      res.end()
    }
  })
})

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}/`)
})