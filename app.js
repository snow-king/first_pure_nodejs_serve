const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer(((req, res) => {
    console.log(`req: ${req.url}`)
    // core
    if (req.url === '/'){
        sendRes(`index.html`,`text/html`, res)
    }
    else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST'){
        let data = ''
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            saveFile(data);
        });
    }
    else if (/\/poem$/.test(req.url)) {
        res.writeHead(200, {"Content-Type": "application/json"});
        let data = getPoem()
        console.log(`send ${data}`)
        data = JSON.stringify(data)
        res.end(data)
    }
    else {
        sendRes(req.url,getContentType(req.url),res)
    }
})).listen(3000, () =>{
    console.log('node.js port 3000')
})

/***
 *  Send request
 * @param url
 * @param contentType
 * @param res
 */
function sendRes(url, contentType, res){
    let file = path.join(__dirname+'/static/', url)
    fs.readFile(file,((err, data) => {
        if (err){
            res.writeHead(404)
            res.write(`file not found`)
            res.end()
            console.log(`ERROR 404 ${file}`)
        }else {
            res.writeHead(200, {'Content-Type': contentType})
            res.write(data)
            res.end()
            console.log(`res 200 ${file}`)
        }
    }))
}

/***
 *  we determine the type of content
 * @param url
 * @returns {string}
 */
function getContentType(url) {
    switch (path.extname(url)){
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        default:
            return "application/octate-stream";
    }
}

function saveFile(data){
    fs.writeFile("uploads/Omar_Khayyam.txt", data, (error) =>{
        if(error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена.");
    });
}
function getPoem(){
    let poem = arrayRandElement(fs.readFileSync("uploads/Omar_Khayyam.txt", "utf8").split('***'))
      console.log(poem)
    return poem
}
function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length)
    return  {"poem": arr[rand]}
}