
# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️


# Habilidades


Nesse projeto, você foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize** realizando as tarefas abaixo.

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;
 
 
## Testar Aplicação
Segue abaixo os links do back-end cujo foi desenvovido por mim, e tambem o link do front-end para um teste visual de maneira mais rápida, mas o teste
do back-end pode ser feito tambem utilizando o postman, insomnia ou outra ferramenta de sua preferencia.

Obs: O front-end foi desenvolvido pela equipe da trybe, o desafio do projeto consistia em desenvolver o back-end apenas.

email e senha para login na aplicação: admin@admin.com, secret_admin.

Front-End: https://trybefc-front-001.herokuapp.com/
Back-End: https://trybefc-001.herokuapp.com/

## O que foi desenvolvido

Foi arquitetado e desenvolvido uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, foram desenvolvolvidos alguns endpoints (seguindo os princípios **REST**) que estarão conectados ao banco de dados. 

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

---

## Desenvolvimento

O objetivo foi desenvolver uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.



## Conteudo:


### Login

- A rota (`/login`).

- A rota deve receber os campos `email` e `password` e esses campos são validados no banco de dados;
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.


- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```


####  endpoint `/login` foi desenvolvido de maneira que permita o acesso com dados válidos no frontend

  - A rota de ser do tipo `POST`

  Caso o login seja feito com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "123.456.789" // Aqui deve ser o token gerado pelo backend.
  }
  ```


#### o endpoint `/login` não permite o acesso com um email inválido no front-end


  Se o login tiver o "email" **inválido** o resultado retornado é conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```


#### o endpoint `/login` não permite o acesso com uma senha inválida no front-end


  Se o login tiver a "senha" **inválida** o resultado retornado é conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```


#### o endpoint `/login` não permite o acesso sem informar um email no front-end

  Se o login não tiver o campo "email", o resultado retornado é a mensagem abaixo, com um status http `401`:
  ```json
    { "message": "All fields must be filled" }
  ```


####  o endpoint `/login` não permite o acesso sem informar uma senha no front-end

  - O avaliador verificará se ao tentar fazer login sem senha retornará status não-autorizado

  Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "All fields must be filled" }
  ```

####  o endpoint `/login/validate` 

  -  rota `GET` que recebe um `header` com parâmetro `authorization` onde ficará armazenado o token gerado no login;

  A resposta tem o status `200` com uma `string` contendo a `role` do *user*:
  ```plaintext
    "admin"
  ```

### Jogos


####  o endpoint `/clubs` retorna todos os times

  - rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	},
	...
]
```

####  o endpoint `/clubs/:id`  retorna dados de um time específico

  -  rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
	"id": 5,
	"clubName": "Cruzeiro"
}
```


####  o endpoint `/matchs` retorna os dados corretamente na tela de partidas no front-end.

  - rota `GET` retorna uma lista de partidas

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Internacional"
        }
      }
    ]
    ```

####  o endpoint `/matchs` filtra as partidas em andamento na tela de partidas do front-end

  -  rota do tipo `GET` e retorna uma lista de partidas filtradas

  - Essa requisição usa `query string` para definir o parâmetro
    ex: `matchs?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "Ferroviária"
      },
      "awayClub": {
        "clubName": "Avaí/Kindermann"
      }
    }
  ]
  ```

#### 21 - o endpoint `/matchs` filtra as partidas finalizadas na tela de partidas do front-end

  - rota do tipo `GET` e retorna uma lista de partidas filtradas

  - Essa requisição usa `query string` para definir o parâmetro
    ex: `matchs?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "Internacional"
      },
      "awayClub": {
        "clubName": "Santos"
      }
    }
  ]
  ```

### Adicionar Partidas

####  a rota `/matchs` salva uma partida com o status de inProgress como true no banco de dados

  - A rota do tipo `POST`, retorna a partida inserida no banco de dados

  - A partida só é criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
  ```

  - caso a partida seja inserida com sucesso, deve-se retornar os dados da partida:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

#### a rota `/matchs/:id/finish` salva uma partida com o status de inProgress como false no banco de dados

  - A rota do tipo `PATCH`

  - É recebido o `id` pelo parâmetro da URL


#### o endpoint `/matchs` inseri uma partida de forma que não seja possível inserir uma partida com times iguais

  -  não é possível inserir uma partida com times iguais

  - Não é possível criar uma partida com o mesmo time, exemplo: Barcelona x Barcelona, caso contrário, deve-se retornar o seguinte erro:

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

#### o endpoint `/matchs` não permite inserir uma partida com time que não existe na tabela clubs

  - Não é possível inserir uma partida com time que não existe na tabela clubs

  - caso algum dos times não esteja cadastrado no banco de dados, retorna o seguinte erro:

  ```json
  { "message": "Team not found" }
  ```

### Editar Partidas

#### o endpoint `/matchs/:id` atualiza partidas em andamento

  - O endpoint do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

#### o endpoint `/matchs/:id` finaliza partidas em andamento

  - O endpoint do tipo `PATCH`

  - Será recebido o `id` pelo parâmetro da url

## Leaderboards

  **A classificação, segue as seguintes regras de negócios**
  - Em que:
    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols marcados contra;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    <br/>

  - Toda a regra de negócio e cálculos necessários são realizados no back-end. A aplicação front-end apenas renderiza essas informações;

  - Para calcular o `Total de Pontos` é levado em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)` que é a porcentagem de jogos ganhos, use a seguinte fórmula: `P/(J*3)*100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

  - O resultado é ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, é levado em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols contra.


  **Exemplo de retorno:**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```

### Leaderboard Home

#### o endpoint `/leaderboard/home`, filtra a classificação dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados


#### o endpoint `/leaderboard/home`, filtrar a classificação dos times quando mandantes na tela de classificação do front-end e ao inserir a partida a tabela será atualizada


### Leaderboard away

####  o endpoint `/leaderboard/away`, filtra as classificações dos times  na tela de classificação do front-end, com os dados iniciais do banco de dados


####  o endpoint `/leaderboard/away`, filtra a classificação dos times na tela de classificação do front-end e ao inserir uma partida a tabela é atualizada


### Leaderboard

  - Esse endpoint irá alimentar no front-end uma tabela idêntica ao exemplo abaixo:

    | Classificação |   Time    | P  | J  | V  | E | D | GP | GC | SG | %    |
    |---------------|-----------|----|----|----|---|---|----|----|----|------|
    |      1        |Corinthians| 38 | 15 | 12 | 2 | 1 | 44 | 13 | 31 | 84.4 |


####  o endpoint `/leaderboard`, filtra a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

#### o endpoint /leaderboard filtra a classificação geral dos times na tela de classificação do front-end e ao inserir uma partida a tabela é atualizada

