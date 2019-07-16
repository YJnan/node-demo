//https://ynan.top


//port:22 ssh,80:http 443:https 27017:mongodb 

//HTTP请求第一部分 GET /index/ HTTP/1.1

//HTTP方法 GET POST PATCH PUT DELETE OPTIONS HEAD

//path: /user get:获取用户 post：创建用户 patch：修改用户信息 delete:删除
//请求头第一回到第二行空行之前 
//重要的键值对： Content-Type:请求体的类型（编码、格式等）
//Contetn-Length: 请求体的长度
//Accept: 能够接受的返回体类型
//Cookie:cookie

//HTTP第二部分： 一个空行作为分隔符

//HTTP第三部分： 请求体 http-request/response-body
//请求体的格式、编码通常由请求体头里的content-type指定，可能会很大

const url = `schema://host:port/path/path?query#hash`;

const http = require('http')
const server = http.createServer()
server.listen(8888)
const qs = require('querystring')

const users = [];

server.on('request', (request, response) => {

    const url = request.url;

    const queryString = url.substr(url.indexOf('?') + 1, url.length);

    const path = url.substr(0, url.indexOf('?'));

    const query = qs.parse(queryString);

    console.log(query);

    switch (path) {
        case '/user':
            switch (request.method) {
                case 'GET':
                    response.statusCode = 200;
                    response.end(JSON.stringify(users))
                    break;
                case 'POST':
                    const contentType = request.headers['content-type']

                    if(contentType !== 'qpplication/json'){
                        response.statusCode = 400
                        response.end('error')
                    }
 
                    let requestBodyStr = ''
                    request.on('data', (data) => {
                        requestBodyStr += data.toString()
                    })
                    request.on('end', () => {
                        const user = JSON.parse(requestBodyStr);
                        users.push(user);
                        response.statusCode = 200
                        response.end(JSON.stringify(user))
                    })
                    break;
            }

            break;
        default:
            response.statusCode = 404;
            response.end('NOT_FOUND');
            break;
    }
});