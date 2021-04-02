
//Identificador de sinais de libras em vídeo
//Usando ml5 (neuralNetwork e Handpose), p5.js e 
//Isabela Zamith, 2021
/*
FUNCOES DE APOIO
*/

/* VARIÁVEIS GLOBAIS */
let sign;
let hand;
let modelStatus;

// espelhar o vídeo (flippedVideo)
function flipVideo(flippedVideo) {
    //move image by the width of image to the left
    translate(flippedVideo.width, 0);
    //then scale it by -1 in the x-axis
    //to flip the image
    scale(-1, 1);
    //draw video capture feed as image inside p5 canvas
    image(flippedVideo, 0, 0);
    return image(flippedVideo, 0, 0);
};

// handpose carregado
function handReady() {
  console.log("Handpose Carregado!");
};

// input do usuário para começar a coleta e salvar o json com os dados
function keyPressed() {
    // salvar dados de treinamento coletados
    if (key == "s") {
        neuralNet.saveData();
        console.log('Modelo salvo');
    }
    // começar o treinamento com espaço
    else if (key == " ") {
        // status do treinamento
        training = "training";
        console.log('training');
        // pegar o nome da label de um prompt
        var i = prompt('Categoria');
        label = i
          // debug console.log(label);

        // fica 5 seg coletando
        setTimeout(function() {
            training = "not training"
            console.log('not training')
            }, 10000
        );
    };
};

// pegar os dados dos pontos do vídeo
function gatherData() {
  let inputs = [];
  for (let i = 0; i < predictions.length; i += 1) {
    // armazena o conjunto de landmarks de cada sinal (i)
    const prediction = predictions[i];
    // para cada conjunto, identificar o conjunto de coordenadas
    // x, y z
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      let x= keypoint[0];
      let y= keypoint[1];
      let z= keypoint[2];
      inputs.push(x);
      inputs.push(y);
      inputs.push(z);
        //debug console.log(x,y,z)   
    };
  };
  //colocar a label que foi digitada pelo usuario
  let target = [label];
  neuralNet.addData(inputs, target);
};

// quando os dados foram carregados
function dataReady() {
  // números grandes, precisa normalizar
  neuralNet.normalizeData();
  // treinar a neuralNet com os dados carregados
  neuralNet.train({epochs:50}, loaded);
};

// quando o modelo foi treinado, etapa final
function modelIsReady() {
  modelStatus = "ready"
  console.log('Classificação de libras carregada!');
  console.log("Modelo pronto!") 
};

function gotResult(error, results) {
 // console.log(results);
 // console.log(results[0].confidence);
// if (typeof results !== 'undefined') {
 if (results) {
// apenas se o resultado tiver a confidence quase 1
// escrever na tela
  if (results[0].confidence >= 0.9) {
    signLabel=results[0].label;
    // o texto depois some 
    setTimeout(function() {
      signLabel = ""
    },1000);
  }

  setTimeout(identifySigns,1000);
  //console.log('gotresults')
//  console.log(results);
  }
};  

// identificar a posicao das mãos
function identifySigns(){
  // caso não apareça nenhuma mão
  if (predictions.length == 0) {
    // aguarde e tente dnv 
    setTimeout(identifySigns,1000);
    };

    // Só depois que o texto sumir  
    if (signLabel == "") {
      let inputs = []
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
          const keypoint = prediction.landmarks[j];
          let x= keypoint[0];
          let y= keypoint[1];   
          let z= keypoint[2];
          inputs.push(x);
          inputs.push(y);
          inputs.push(z)
          //console.log('ok')
        }
      }
      // ml5 neuralnet classifica os pontos encontrados 
      neuralNet.classify(inputs,gotResult)
     }
};
 

function loaded() {
  console.log('Modelo Carregado!');
  neuralNet.save();
};

function toggleSigns() {
  document.getElementById('signs').style.display="none"
}