### Preparação
-----
Escolhi o angularjs devido ser uma linguagem de maior dominio e por eu já possuir um projeto esqueleto
onde ganho tempo para desenvolver novos projetos.
-----
- Precisaremos do nodejs instalado em nossa máquina, para instalar basta seguir este link.:
https://nodejs.org/en/download/

Dentro do diretório **rotas-angularjs**, execute o seguinte comando no terminal:

```bash
$ npm install -g gulp
```

Depois de instalar o gulp, execute o seguinte comando no terminal: 

```bash
$ npm install
```

Isso irá instalar as dependências do arquivo **package.json**, que contém:

```bash
"gulp": "^3.9.1",
"gulp-cli": "^1.4.0",
"browser-sync": "^2.18.13",
"gulp-autoprefixer": "^4.0.0",
"gulp-cssmin": "^0.2.0",
"gulp-imagemin": "^3.4.0",
"gulp-rename": "^1.2.2",
"gulp-sass": "^3.1.0",
"gulp-wait": "0.0.2",
"gulp-webserver": "^0.9.1",
"gulp-concat": "^2.6.1",
"gulp-ng-annotate": "^2.1.0",
"gulp-plumber": "^1.2.0",
"gulp-uglify": "^3.0.0",
"gulp-bytediff": "^3.0.0"
```

Depois que as dependências estiverem instaladas, basta executar o seguinte comando no terminal:

```bash
$ gulp
```

Isso irá gerar uma nova instância do webserver, levantando sua aplicação local com os seguintes tratamentos, de acordo com o **gulpfile.js**:

- (gulp-sass)  
Toda alteração de SASS será automaticamente aplicada no arquivo CSS final;
- (gulp-autoprefixer)  
Toda regra CSS que exija prefixos vendor (ex: -webkit, -moz, -o, etc) será automaticamente aplicado no arquivo CSS final, não é mais necessário colocá-las nos arquivos .scss;
- (gulp-cssmin + gulp-rename)  
Todo o CSS final será minificado cada vez que uma alteração de SASS gerar um novo arquivo;
- (gulp-imagemin)  
Toda imagem contida no diretório /img será otimizada e substituída antes do servidor levantar o site;
- (browser-sync)  
Toda alteração feita em arquivos HTML, SASS e JS causará refresh automático da página, pra agilizar o preview;
- (gulp-uglify)
Toda alteração feita em arquivos js pré definidos em gulpfile, será gerado um novo arquivo de 
distribuição em js -> app.js (utilizado para distribuição);

### Importante
-----
Alterações de CSS devem ser realizadas nos arquivos .scss, dentro do diretório **/sass**. Alterações realizadas no arquivo .css do diretório **/css** serão sobrescritas sempre que um arquivo .scss for alterado.

O diretório **/node_modules** será criada com as dependências que você instalou através do package.json, mas o commit dessa pasta é ignorado por conta do arquivo **.gitignore**

Toda e qualquer nova biblioteca/framework que for instalado através do npm, deve seguir o comando **--save-dev** pra ser adicionada na lista de dependências do package.json, assim o(a) próximo(a) dev que pegar o projeto, já terá tudo na mão.