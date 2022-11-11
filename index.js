const express = require('express')
const ytdl = require('ytdl-core')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/default.html')
})

app.get('/download', function (req, res){	
	if(req.query.tipo == 'video'){	
		res.header("Content-Disposition", 'attachmentt; filename="video.mp4"')
		return ytdl(req.query.url).pipe(res)
	}
	else if(req.query.tipo == 'mp3'){
		res.header("Content-Disposition", 'attachmentt; filename="audio.mp3"')
		return ytdl(req.query.url, { filter: 'audioonly'}).pipe(res)
	}
})

app.listen('8080', ()=> {
	console.log('Aplicativo Rodando na Porta 8080')
})