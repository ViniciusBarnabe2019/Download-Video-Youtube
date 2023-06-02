const express = require('express')
const ytdl = require('ytdl-core')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/default.html')
})

app.get('/download', async function (req, res){	
	if(req.query.tipo == 'video'){	
		//Cabeçalho de Resposta definido pra enviar um Arquivo MP4
		res.header("Content-Disposition", 'attachmentt; filename="video.mp4"')
		//Responde com o Arquivo MP4
		return ytdl(req.query.url).pipe(res)
	}
	else if(req.query.tipo == 'mp3'){
		//Obtem Informações do Vídeo
		let infoSong = await ytdl.getInfo(req.query.url)
		//Pega titulo do vídeo removendo se necessário caracteres especiais por espaços vazios
		let titleSong = infoSong.videoDetails.title.replace(/[^\w\s]/gi, '')
		//Cabeçalho da Resposta definido pra enviar um Arquivo MP3 com nome do Vídeo
		res.header('Content-Disposition', `attachment; filename="${titleSong + '.mp3'}"`)
		//Responde com o Arquivo MP3
		return ytdl(req.query.url, { filter: 'audioonly'}).pipe(res)
	}
})

app.listen('8080', ()=> {
	console.log('Aplicativo Rodando na Porta 8080')
})