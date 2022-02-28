//Variaveis de cada posição da tabela
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

//variáveis para guardar cada posição marcada
var dados=[]
let bot_jogadas=[d01,d02,d03,d04,d05,d06,d07,d08,d09]

let contar=0

let count_x =0
let count_o =0

let escolha=0
let simbolo=''
let sim_color=''
let simbolo_bot=''
let simb_color=''
document.body.addEventListener('mousedown',function(){
    musica.muted=false
    musica.play()
    musica.autoplay=true
    musica.loop=true
    musica.playbackRate=1 
    musica.volume=0.5

})

escolher()

//função para escolher entre O e X
function escolher() {
    escolha = Number(prompt('Escolha 1 para O e 2 para X'))
    if (escolha==1) {
        simbolo='O'
        sim_color='#FE711A'
        simbolo_bot='X'
        simb_color='#7500E5'
    } else if(escolha==2){
        simbolo='X'
        sim_color='#7500E5'
        simbolo_bot='O'
        simb_color='#FE711A'
    }
    else{
        alert('Valor não reconhecido')
        setTimeout(function(){location.reload()},500)
    }
}

//função que conta a pontuação
function pontuacao(score,num,cont,simb) {
    score.innerHTML =`Pontos do <span>${simb}</span> : <span><strong>${num}</strong></span>`
    cont=cont
}

//função que checa se algum dos jogadores ganharam
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

    // for que checa se alguns dos arrays tem 3 marcações de algum dos jogadores
    for (let key in all) {
       for (let index = 0; index <= 3; index++) {
          if (String(all[key][index])=='X') {
              x+=1
          }
          else if(String(all[key][index])=='O'){
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

//função que marca na tabela recebe como parâmentro a possição do td(table data) 
function jogar(x) {
    let c = 0
    let bot_c=0

   if (dados.indexOf(x)!=-1) {
       alert('Ai ja foi jogado')
   } else {
       let escrever= new Audio('audios/beep.mp3')
       escrever.play()
       //escrever.playbackRate=3
    
    if (escolha==1) {
        c=1
        bot_c=0
    } else {
        c=0
        bot_c=1
    }

    if (contar%2==c) {
        x.innerHTML=simbolo
        x.value=simbolo
        x.style.color=sim_color
        contar++
        dados.push(x)
        bot_jogadas.splice(bot_jogadas.indexOf(x),1)
        ganhar()
    }
    setTimeout(function(){bot(bot_c,simbolo,simbolo_bot)},1000)
}}

//função do bot
function bot(bc,s,sb) {
    let row_1=[d01,d02,d03]
    let row_2=[d04,d05,d06]
    let row_3=[d07,d08,d09]
    let ver_1=[d01,d04,d07]
    let ver_2=[d02,d05,d08]
    let ver_3=[d03,d06,d09]
    let dia_1=[d01,d05,d09]
    let dia_2=[d03,d05,d07]
    let dia_3=[d09,d05,d01]
    let dia_4=[d07,d05,d03]
    let all=[dia_1,dia_2,dia_3,dia_4,row_1,row_2,row_3,ver_1,ver_2,ver_3]

    var p=0
    var b=0
    var chave=0
    var chave_2=0

   if (contar%2==bc) {
    let escrever= new Audio('audios/beep.mp3')
    escrever.play()
    
    //ele aqui verá se tem em algum dos arrays 2 posições marcadas, caso tenha e
    // a posição faltante não foi marcada pelo oponente ele marcará
    for (let key in all) {
        for (let index = 0; index < 3; index++) {
           if(String(all[key][index].value)==sb){
               b+=1
           } 
           else{
               if (String(all[key][index].value)==s) {
                   p+=1
               } else {
                   chave_2=index
               }
           } 
         }
         if (b==2 && p==0) {
             chave=key
             break
         } else {
            b=0
            p=0
         }
    }
    if (b==0) {
        // caso o oponente esteja prestes a ganhar, o bot marcará para impedir
        for (let key2 in all) {
            for (let index = 0; index < 3; index++) {
               if(String(all[key2][index].value)==s){
                   p+=1
               } 
               else{
                   chave_2=index
               } 
             }
             if (p==2) {
                 chave=key2
                 break
             } else {
                p=0
             }
        }   
    }
    //primeiro if da preferência para ganhar
    if (b==2 && bot_jogadas.indexOf(all[chave][chave_2]) != -1) {
        all[chave][chave_2].innerHTML=simbolo_bot
        all[chave][chave_2].value=simbolo_bot
        all[chave][chave_2].style.color=simb_color
        dados.push(all[chave][chave_2])
        bot_jogadas.splice(bot_jogadas.indexOf(all[chave][chave_2]),1)
    }//o segundo para impedir o oponente de ganhar
    else if (p==2 && bot_jogadas.indexOf(all[chave][chave_2]) != -1) {
        all[chave][chave_2].innerHTML=simbolo_bot
        all[chave][chave_2].value=simbolo_bot
        all[chave][chave_2].style.color=simb_color
        dados.push(all[chave][chave_2])
        bot_jogadas.splice(bot_jogadas.indexOf(all[chave][chave_2]),1)
        
    }// e o terceiro marcará aleatoriamente
    else {
        let rad = Math.floor(Math.random()*bot_jogadas.length)
        bot_jogadas[rad].innerHTML=simbolo_bot
        bot_jogadas[rad].value=simbolo_bot
        bot_jogadas[rad].style.color=simb_color
        dados.push(bot_jogadas[rad])
        bot_jogadas.splice(bot_jogadas.indexOf(bot_jogadas[rad]),1)
    }
    
    contar++ 
    ganhar()
}
}

// Função que reseta o jogo
function reset() {
    for (const key in dados) {
        dados[key].innerHTML='<br>'
        dados[key].value=''
    }
    dados=[]
    bot_jogadas=[d01,d02,d03,d04,d05,d06,d07,d08,d09]
}
//função para finalizar o jogo e anunciar o campeão(caso haja)
function _finalizar() {
    let botao= document.getElementById('finalizar')
    let result = document.getElementById('result')
    let texto= document.createElement('p')
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
        texto.innerHTML='O ganhador foi <span>X</span>'
        gif.src='imagens/trofeu.gif'
        palmas.play()
    } else if (count_o>count_x) {
        texto.style.color='#FE711A'
        texto.innerHTML='O ganhador foi <span>O</span>'
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
//função para voltar para o index
function voltar() {
    window.location.assign("index.html")
}