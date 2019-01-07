### LARAVEL
-----
Escolhi o laravel, devido algumas de suas facilidades:
- Migrations : me possibilita documentar como será o banco de dados sem precisar criar scripts sql.
- Seeds : Posso criar uma base de dados para dar um start na aplicação.
- Fácil configuração para iniciar uma API.
- Implementação de JWT de maneira simples.
-----

### Instalação
- Passo 1: É necessário ter o PHP em sua máquina a maneira mais simples é através do xampp. Basta efetuar o download através do link, e seguir normalmente com a instalação.
Link.: https://www.apachefriends.org/pt_br/index.html
- Passo 2: Instalar o composer (https://getcomposer.org/download/) a versão utilizada nesse projeto é 1.8.0
- Passo 3: Será utilizado o banco de dados Mysql 5.7.20
- Passo 4: Configurar o laravel para acessar o base de dados, para isso é necessário acessar o arquivo: '.env' que está na raiz do projeto.
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rotas
DB_USERNAME=usuario
DB_PASSWORD=senha
```
após realizar essa configuração iremos baixar todas as dependencias do projeto.
Vá até o repositório de instalação do laravel e rode o seguinte comando:
```bash
composer install
```