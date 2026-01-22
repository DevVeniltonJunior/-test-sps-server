# test-sps-server

Projeto de exemplo para um servidor Node.js (Express) com uma suíte de testes em Jest.

Este repositório contém controladores, use cases, serviços e repositórios falsos (fake) usados para demonstrar/validar um fluxo típico de API REST com testes unitários e de integração.

## Sumário

- Instalação
- Como executar
- Testes
- Cobertura de testes
- Estrutura do projeto

## Instalação

1. Clone o repositório:

   git clone [<url-do-repositorio>](https://github.com/DevVeniltonJunior/-test-sps-server.git)
   cd -test-sps-server

2. Instale dependências:

   npm install
  3. Crie um arquivo `.env` na raiz do projeto com as variáveis mínimas necessárias. Exemplo:

  ```
  PORT=3000
  JWT_SECRET=troque-por-uma-chave-secreta
  ```

## Executando

Para iniciar o servidor em modo de desenvolvimento (com `nodemon` e reload automático):

  npm run dev

Abra o navegador ou use o `curl`/Postman para testar os endpoints conforme configurado em `src/core/config/routes.js`.

## Testes

O projeto usa Jest. Os scripts disponíveis em `package.json` são:

- `npm test` — executa o Jest (usa `--experimental-vm-modules`).
- `npm run test:unit` — executa apenas os testes de unitarios.
- `npm run test:integration` — executa apenas os testes de integração.

Exemplos:

- Executar todos os testes:

	npm test

- Executar testes unitários isolados:

	npm run test:unit

- Executar testes de integração isolados:

	npm run test:integration

- Executar um arquivo/descrição específica:

	npm run test algumTeste.spec.js

## Cobertura de testes

Para gerar relatório de cobertura com o Jest, rode:

	npm test -- --coverage

O relatório será gerado na pasta `coverage/` (já presente no repositório com relatórios de exemplo).

## Estrutura do projeto (resumo)

- `src/`
  - `controllers/` — definem os handlers HTTP
  - `usecases/` — regras de negócio (casos de uso)
  - `repositories/` — repositórios (inclui `FakeUserRepository` para testes)
  - `services/` — serviços compartilhados (ex.: TokenService)
  - `core/config/` — configuração do servidor e rotas
  - `utils/` — utilitários (ex.: validação de email, erros)

- `tests/` — suíte de testes (unitários e de integração)
- `jest.config.mjs` — configuração do Jest
- `package.json` — scripts e dependências

## Dicas e solução de problemas

- Se os testes falharem por incompatibilidade com `--experimental-vm-modules`, verifique sua versão do Node. Atualize para uma versão LTS (recomenda-se Node 18+).
- Se tiver erro relacionado a variáveis de ambiente, crie/ajuste o `.env` ou exporte as variáveis antes de rodar.
- Para problemas com portas em uso, ajuste a porta no arquivo de configuração do servidor (procure por `src/core/config/index.js`).