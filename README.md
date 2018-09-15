# HappyEmojiGram

表哥的快乐表情屋

## DOC

<https://docs.google.com/document/d/1SrxL11AjHptVZf4kOnzQWAovrGE5ZV_hc41TZN3C-0g/edit?usp=sharing>

## Installation

```bash
sudo apt install curl git -y
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g nodemon

git clone https://github.com/ThisZW/Instasao.git
cd Instasao/instasao
npm install
(cd client && npm install)
```

## Two servers

* run express server

    <http://127.0.0.1:8000>

* run hot reload server

    <http://127.0.0.1:3000>

    
```bash
# run both 
npm test
# run server only 
npm start
```
