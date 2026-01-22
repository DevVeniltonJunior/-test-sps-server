// Helper para simular a req que o controler vai receber no test
const BODY = {};
const PARAMS = {};
const QUERY = {};

export const HttpRequestMock = (body = BODY, params = PARAMS, query = QUERY) => {
  return {
    body,
    params,
    query,
  };
}