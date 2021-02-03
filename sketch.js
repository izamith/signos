//Identificador de sinais de libras em vídeo
//Usando ml5 (neuralNetwork e Handpose), p5.js e 
//Isabela Zamith, 2021
/*
  1 Captura dos dados que vão montar o modelo de treinamento
  2 Salvar os dados (json), gerar o modelo (model.loadData())
  3 Salvar o modelo, 3 arquivos que vão para modelInfo
*/


/* 
ELEMENTOS DO CANVAS E SETUP
*/
/* VARIÁVEIS GLOBAIS */
// rede neural ml5
let neuralNet;
// vídeo espelhado
let flippedVideo;
// posição dos pontos na imagem
let predictions = [];
// armazena as categorias(nomes) de cada pose
let label = "";
// status do treinamento
let training = "Not training"
let signLabel = ""
let font
/* SETUP DO PROJETO */
function preload() {
  font = loadFont("style/AdventPro.ttf")
};
function setup() {
  // canvas
  createCanvas(640, 480);
  // captura de vídeo via webcam
  video = createCapture(VIDEO);
  // vídeo corresponde ao tamanho do canvas
  video.size(width, height);
  // como padrão, o vídeo aparece ao lado do canvas, para evitar
  // escondi ele e vou projetar o que acontece nele no canvas
  video.hide();
  // video espelhado
  flippedVideo = flipVideo(video);
  // rede neural padrão handpose
  handpose = ml5.handpose(video, handReady);
  // numero inputs e outputs e outras propriedades da rede
  // padrão ml5
  let options = {
    // 21 keypoints do handpose, com 3 coordenadas cada (x,y,z) 
    inputs: 63,
    // 2 outputs possíveis (categorias), no caso mão aberta e mão fechada
    outputs: 2,
    task: 'classification',
    debug: true
  };
  // ml5 neuralnetwork, recebe o objeto options que tem 
  // as propriedades da rede neural options
  neuralNet = ml5.neuralNetwork(options);
  
  /* HANDPOSE */
  handpose.on("predict", results => {
    predictions = results;
    //Se aparecer alguma mão na camera
    if (predictions.length > 0) {
        //DEBUG 
        //console.log(predictions[0]['landmarks']);
      //se o treinamento estiver acionado:
      if (training=='training') {
        gatherData();
      }
      else if (modelStatus == "ready") {
        identifySigns()
      }
    };
  });
                /* PONTO DE ESCOLHA, 
                O MODELO JÁ FOI GERADO: */
                /* CARACTERISTICAS DO MODELO */
                // padrão ml5, object

  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  // carregar modelo treinado
  neuralNet.load(modelInfo, modelIsReady);


              /* PARA GERAR O MODELO A PARTIR DE DADOS COLETADOS: */
                // essa parte só é necessária caso 
                // eu não tenha o modelo já pronto
 // neuralNet.loadData('libras.json', dataReady);
};
/* ELEMENTOS QUE APARECEM NO CANVAS */
function draw() {
  background(0);
  // video espelhado
  push()
  flipVideo(video);
  // elipses onde há pontos reconhecidos na mão
  // drawKeypoints();
  pop()

  push()
  fill(4,15,6);
  rect(0,430,width,50)
  pop()

  push()
  // texto - sinal identificado
  fill(236,89,55);
  noStroke();
  textSize(40);
  textAlign(CENTER, CENTER);
  textFont(font);
  text(signLabel, width/2, height-32);
  pop()
};
/* ELIPSES */
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      let x= keypoint[0];
      let y= keypoint[1];   
      fill(255, 43, 0);
      noStroke();
      ellipse(x, y, 10, 10);
        // Debug console.log('Hand detected!')
    }
  }
};