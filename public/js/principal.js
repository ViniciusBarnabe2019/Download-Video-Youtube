const inputUrl = document.getElementById("url")
const iconLink = document.getElementById('link')
const spanUrl = document.getElementsByClassName('span_url')[0]
const btnBaixar = document.getElementsByClassName('btn_baixar')[0]
const modal = document.getElementsByTagName('dialog')[0]
const close = document.getElementById('close')

inputUrl.addEventListener('focus', foco)

inputUrl.addEventListener('blur', () => {
  spanUrl.style.backgroundColor = '#e9ecef';
  spanUrl.style.borderColor = '#e9ecef'
  spanUrl.style.boxShadow = 'none'
  iconLink.style.color = 'black'
})

function foco(){	
	spanUrl.style.backgroundColor = '#cc181e'
	spanUrl.style.borderColor = '#cc181e'
	spanUrl.style.boxShadow = '0 0 0 0.1em #cc181e'
	iconLink.style.color = 'white'
}

close.addEventListener('click', () => {
	modal.close()
})

function baixar(url, tipo){
	if(url == ''){
		foco()
	}
	else if(!verifica(url)){
		modal.showModal()			
	}
	else{
		window.open("http://localhost:8080/download/?url=" + url + "&tipo=" + tipo)
	}
}

function verifica(url){
	return url.includes('https://www.youtube.com/watch?v=')
}