//variáveis de cada posição
let d01= document.getElementById('d01')
let d02= document.getElementById('d02')
let d03= document.getElementById('d03')
let d04= document.getElementById('d04')
let d05= document.getElementById('d05')
let d06= document.getElementById('d06')
let d07= document.getElementById('d07')
let d08= document.getElementById('d08')
let d09= document.getElementById('d09')

let score_x= document.getElementById('score_x')
let score_o= document.getElementById('score_o')

let musica = new Audio('audios/principal.mp3')
musica.muted=true

var dados=[]

let contar=0

let count_x =0
let count_o =0

document.body.addEventListener('mousedown',function(){
    musica.muted=false
    musica.play()
    musica.autoplay=true
    musica.loop=true
    musica.playbackRate=1 
    musica.volume=0.5

})

// função para pontuar
function pontuacao(score,num,cont,simb) {
    score.innerHTML =`Pontos do <span>${simb}</span> : <span><strong>${num}</strong></span>`
    cont=cont
}

// função que checa se teve algum vencedor
function ganhar() {
    var row_1=[d01.value,d02.value,d03.value]
    var row_2=[d04.value,d05.value,d06.value]
    var row_3=[d07.value,d08.value,d09.value]
    var ver_1=[d01.value,d04.value,d07.value]
    var ver_2=[d02.value,d05.value,d08.value]
    var ver_3=[d03.value,d06.value,d09.value]
    var dia_1=[d01.value,d05.value,d09.value]
    var dia_2=[d03.value,d05.value,d07.value]
    var all=[row_1,row_2,row_3,ver_1,ver_2,ver_3,dia_1,dia_2]
    
    var x=0
    var o=0

    for (let key in all) {
       for (let index = 0; index <= 3; index++) {
          if (String(all[key][index])=='x') {
              x+=1
          }
          else if(String(all[key][index])=='o'){
              o+=1
          }
       }
       if (x==3 || o==3) {
           break
       } else {
           x=0
           o=0
       }
    }
    if (x==3) {
        setTimeout(function(){alert('Ganhador é o X')},500)
        setTimeout(function(){reset()},500)
        count_x++
        pontuacao(score_x,count_x,contar=1,'X')
    } else if(o==3) {
        setTimeout(function(){alert('Ganhador é o O')},500)
        setTimeout(function(){reset()},500)
        count_o++
        pontuacao(score_o,count_o,contar=0,'O')
    }
    else if (dados.length==9) {
        setTimeout(function(){alert('Empate!!!')},500)
        setTimeout(function(){reset()},500)
        contar=0
    }
}

// função para marcar nas células
function jogar(x) {
   if (dados.indexOf(x)!=-1) {
       alert('Ai ja foi jogado')
   } else {
    dados.push(x)

    let escrever= new Audio('audios/beep.mp3')
    escrever.play()
    

    if (contar%2==0) {
        x.style.color='#7500E5'
        x.innerHTML='X'
        x.value='x'
        contar++
    } else {
        x.style.color='#FE711A'
        x.innerHTML="O"
        x.value='o'
        contar++
    }
    ganhar()
   }
}

// Função que reseta o jogo atual
function reset() {
    for (const key in dados) {
        dados[key].innerHTML='<br>'
        dados[key].value=''
    }
    dados=[]
}

// função que finaliza e recarrega a página do game
function _finalizar() {
    let botao= document.getElementById('finalizar')
    let result = document.getElementById('result')
    let texto= document.createElement('p')
    let span_ele= document.createElement('span')
    let gif = document.createElement('img')
    gif.width=300
    gif.alt='troféu'
    
    result.appendChild(texto)
    result.appendChild(gif)

    var palmas= new Audio('audios/winner.mp3')
    var vaia = new Audio('audios/game-over.wav')

    musica.muted=true
    if (count_x>count_o) {
        texto.style.color='#7500E5'
        texto.innerHTML=`O ganhador foi X`
        gif.src='imagens/trofeu.gif'
        palmas.play()
    } else if (count_o>count_x) {
        texto.style.color='#FE711A'
        texto.innerHTML='O ganhador foi O'
        gif.src='imagens/trofeu.gif'
        palmas.play()
    } else {
        texto.style.color='#240555'
        texto.innerHTML='Empatou!!'
        gif.src="imagens/x-gif.gif"
        vaia.play()
    }
    botao.disabled= true
    setTimeout(function(){location.reload()},5000)
}

// função para voltar para a tela inicial
function voltar() {
    window.location.assign("index.html")
}