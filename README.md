<p align="center">
<img src="https://github.com/izamith/signos/blob/7ae0ee972bbc564c37dd97abcf4616816fd24b21/assets/Framelogo.png" alt="signos" width="300">
<h3 align="center">Usando machine learning para reconhecer sinais de libras</h3>
</p>
<p align="center">"Libras é a sigla da Língua Brasileira de Sinais, uma língua de modalidade gestual-visual onde é possível se comunicar através de gestos, expressões faciais e corporais. É considerada uma língua oficial do Brasil desde 24 de Abril de 2002." <i>(<a href="https://libras.com">Libras.com</a>)</i></p>

signos é um projeto com a ml5: biblioteca de machine learning que te permite criar uma rede neural e treinar essa rede direto no navegador! 🌐

A ml5 tem vários modelos pré-treinados como um classificador de imagens, poses de um corpo e posições de mãos e dedos. Pra fazer esse projeto eu usei o terceiro, que se chama HandPose. 🙋‍♀️

O HandPose me ajudou a identificar o que é uma mão, o que são dedos e onde estão esses elementos no vídeo. 


![Alt Text](https://media.giphy.com/media/UiWilQulmHXeLcnWhT/giphy.gif)</br></br>


Depois, eu treinei minha própria rede neural para identificar posições de dedos e mãos e o que cada uma delas significa.

![Alt Text](https://media.giphy.com/media/VEQmZ487UX2VGqyiW7/giphy.gif)


No final, o sistema foi treinado para reconhecer os sinais "Oi", "Dúvida" e "Entendi". Esses sinais foram registrados de acordo com o[ dicionário de libras (CEAD) ](https://sistemas.cead.ufv.br/capes/dicionario/)

![Alt Text](https://media.giphy.com/media/EQQQDezl9W9URXICDV/giphy.gif)

<a href="https://izamith.github.io/signos/">ACESSE!</a></br></br></br></br>


### Tecnologias
* <a href="https://ml5js.org">ml5.js</a>
* <a href="https://learn.ml5js.org/#/reference/handpose">HandPose</a>
* <a href="https://p5js.org">p5.js</a>

### Referências
* <a href="https://www.youtube.com/channel/UCBMCoXdeIq_NP6ihSh0RI_w">Canal - Sinais diários em libras</a>
* <a href="https://www.youtube.com/watch?v=9z9mbiOZqSs&t=922s">Coding Challenge #157: Zoom Annotations with Machine Learning + p5.js</a>
* <a href="https://www.youtube.com/watch?v=FYgYyq-xqAw&t=1384s">ml5.js: Pose Classification with PoseNet and ml5.neuralNetwork()</a>
