const http = require('http');
const fs = require('fs');
const PORT = 7000;
const server = (req, res) => {
	if (req.url === '/') {
		fs.readFile(`index.html`, (err, data) => {
			if (err) {
				res.end('404');
			} else {
				res.end(data);
			}
		});
	} else {
		res.end('404');
	}
};
http.createServer(server).listen(PORT);
console.log(`Server running in http://localhost:${PORT}`);
