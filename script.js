
const letrasContainer = document.getElementById("letras-container");
const opcaoContainer = document.getElementById("opcao-container");
const usuarioEntradaSencao = document.getElementById("userario-entrada");
const novoJogoContainer = document.getElementById("novo-jogo-container");
const novojogobotao = document.getElementById("novo-jogo-botao");
const canvas = document.getElementById("canvas");
const resultadotexto = document.getElementById("texto-resultado");

//Options values for buttons
let options = {
  frutas: ["Uva", "Laranja", "Banana", "Melancia", "Abacate","Pera", "Acerola", "Amora", "Carambola", "Cereja", "Figo",
"Goiaba", "Kiwi", "Manga",],
  animais: ["Gato", "Rinoceronte", "Tigre", "Elefante", "Cavalo", "Zebra", "Cachorro", "Cobra", "Pato", "Baleia",],
  paises: [   "India", "Brasil", "Inglaterra", "China", "Argentina", "Peru",],
};

//contador
let contadorVitoria = 0;
let contador = 0;

let PalavraEscolhida = "";


const displayOpcaos = () => {
  opcaoContainer.innerHTML += `<h3>Por favor selecione uma opção</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="GerarPalavra('${value}')">${value}</button>`;
  }
  opcaoContainer.appendChild(buttonCon);
};


const bloquear = () => {
  let botaoDeOpcao = document.querySelectorAll(".options");
  let botaoDeLetras = document.querySelectorAll(".Letras");

  botaoDeOpcao.forEach((button) => {
    button.disabled = true;
  });


  botaoDeLetras.forEach((button) => {
    button.disabled.true;
  });
  novoJogoContainer.classList.remove("ocultar");
};


const GerarPalavra = (optionValue) => {
  let botaoDeOpcao = document.querySelectorAll(".options");

  botaoDeOpcao.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });


  letrasContainer.classList.remove("ocultar");
  usuarioEntradaSencao.innerText = "";

  let optionArray = options[optionValue];

  PalavraEscolhida = optionArray[Math.floor(Math.random() * optionArray.length)];
  PalavraEscolhida = PalavraEscolhida.toUpperCase();


  let displayItem = PalavraEscolhida.replace(/./g, '<span class="tracos">_</span>');


  usuarioEntradaSencao.innerHTML = displayItem;
};


const initializer = () => {
  contadorVitoria = 0;
  contador = 0;


  usuarioEntradaSencao.innerHTML = "";
  opcaoContainer.innerHTML = "";
  letrasContainer.classList.add("ocultar");
  novoJogoContainer.classList.add("ocultar");
  letrasContainer.innerHTML = "";


  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("Letras");

    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      let charArray = PalavraEscolhida.split("");
      let tracos = document.getElementsByClassName("tracos");
     
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
        
          if (char === button.innerText) {
      
            tracos[index].innerText = char;
     
            contadorVitoria += 1;
          
            if (contadorVitoria == charArray.length) {
             resultadotexto.innerHTML = `<h2 class='ganho-msg'>Você ganhou!!</h2><p>A palavra é <span>${PalavraEscolhida}</span></p>`;
           
              bloquear();
            }
          }
        });
      } else {
   
        contador += 1;
     
        drawMan(contador);
 
        if (contador == 6) {
         resultadotexto.innerHTML = `<h2 class='perdeu-msg'>Você Perdeu!!</h2><p>A palavra era <span>${PalavraEscolhida}</span></p>`;
          bloquear();
        }
      }

      button.disabled = true;
    });
    letrasContainer.append(button);
  }

  displayOpcaos();
 
  let { desenhoInicial } = canvasCreator();

  desenhoInicial();
};


const canvasCreator = () => {
  let contexto = canvas.getContext("2d");
  contexto.beginPath();
  contexto.strokeStyle = "#000";
  contexto.lineWidth = 2;


  const drawLine = (fromX, fromY, toX, toY) => {
    contexto.moveTo(fromX, fromY);
    contexto.lineTo(toX, toY);
    contexto.stroke();
  };

  const Cabeca = () => {
    contexto.beginPath();
    contexto.arc(70, 30, 10, 0, Math.PI * 2, true);
    contexto.stroke();
  };

  const corpo = () => {
    drawLine(70, 40, 70, 80);
  };

  const bracoEsquerdo = () => {
    drawLine(70, 50, 50, 70);
  };

  const bracoDireita = () => {
    drawLine(70, 50, 90, 70);
  };

  const pernaEsquerda = () => {
    drawLine(70, 80, 50, 110);
  };

  const pernaDireita = () => {
    drawLine(70, 80, 90, 110);
  };

 
  const desenhoInicial = () => {
   
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height);
   
    drawLine(10, 130, 130, 130);
   
    drawLine(10, 10, 10, 131);
    
    drawLine(10, 10, 70, 10);
    
    drawLine(70, 10, 70, 20);
  };

  return { desenhoInicial, Cabeca, corpo, bracoEsquerdo, bracoDireita, pernaEsquerda, pernaDireita };
};


const drawMan = (contador) => {
  let { Cabeca, corpo, bracoEsquerdo, bracoDireita, pernaEsquerda, pernaDireita } = canvasCreator();
  switch (contador) {
    case 1:
      Cabeca();
      break;
    case 2:
      corpo();
      break;
    case 3:
      bracoEsquerdo();
      break;
    case 4:
      bracoDireita();
      break;
    case 5:
      pernaEsquerda();
      break;
    case 6:
      pernaDireita();
      break;
    default:
      break;
  }
};


novojogobotao.addEventListener("click", initializer);
window.onload = initializer;

