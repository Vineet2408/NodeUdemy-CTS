const http = require('http');
console.log('--------server running--------------');

const appserver=http.createServer((req,res)=>{
    console.log('--------incoming  request--------------');

    const url = req.url;
    const body = [];
    const method = req.method;
    res.setHeader('Content-Type','text/html');
   
    console.log("url=",url);
    if(url === '/' )
    {
        console.log('Welcome');
        res.write('<html>')
        res.write('<head><title>Assignment</title><head>');
        res.write('<body>');

        res.write('<h1>Welcome To Node.js Server</h1>');
        res.write('<hr>');

        res.write('<form action="/create-user" method="POST">');
        res.write('<label for="username">Username</label>');
        res.write('<input type="text" placeholder="username" name="username">');
        res.write('<hr>');
        res.write('<button type="submit">Create User</button>');
        res.write('<hr>');
        res.write('</form>');
        res.write('<hr>');
        res.write('<a href="/users">Users</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
     if(url === '/users')
    {
        res.write('<html>')
        res.write('<head><title>Assignment</title><head>');
        res.write('<body>');
        res.write('<h5>Our Users</h5>');
        res.write('<hr>');
        res.write('<ul> <li>Aplha</li> <li>Delta</li> <li>Charlie</li> <li>Bravo</li></ul>');
        res.write('Thanks for visiting');
        res.write('</body>');
        res.write('</html>');
        return 
    }
     if(url === '/create-user' && method === 'POST')
    {
        req.on('data',(bodyData)=>{
            body.push(bodyData);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log("*********************************");
            console.log(parsedBody);
            console.log("*********************************");
            res.setHeader('Location','/');
            res.statusCode = 302;
            //incase of not redirecting
            const s=" Hello new User "+" "+parsedBody.split('=')[1];
            //res.write(s);
            return res.end();
        });
        
    }
   
    
});

appserver.listen(3000);