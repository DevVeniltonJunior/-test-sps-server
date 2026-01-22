// Helper para simular a req que o controler vai receber no test
const BODY = {};
const PARAMS = {};
const QUERY = {};
const CURRENT_USER = {
  id: 'admin-id',
  name: 'Admin User',
  email: 'admin@spsgroup.com.br',
  type: 'admin'
};

export const HttpRequestMock = (body = BODY, params = PARAMS, query = QUERY, currentUser = CURRENT_USER) => {
  return {
    body,
    params,
    query,
    currentUser
  };
}