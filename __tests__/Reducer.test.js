// reducer.test.js

// Teste si le réducteur gère correctement l'action SET_USERS
test('reducer handles SET_USERS action', () => {
  // État initial avec un tableau d'utilisateurs vide et une chaîne de recherche vide
  const initialState = { users: [], searchTerm: '' };
  // Action SET_USERS avec un nouveau tableau d'utilisateurs
  const action = { type: 'SET_USERS', payload: [{ id: 1, login: 'user1' }] };
  // Appel du réducteur avec l'état initial et l'action
  const newState = reducer(initialState, action);
  // Vérifie si l'état après l'action correspond à ce qui est attendu
  expect(newState.users).toEqual([{ id: 1, login: 'user1' }]);
});
// Teste si le réducteur gère correctement l'action SET_SEARCH_TERM
test('reducer handles SET_SEARCH_TERM action', () => {
  // État initial avec un tableau d'utilisateurs vide et une chaîne de recherche vide
  const initialState = { users: [], searchTerm: '' };
  // Action SET_SEARCH_TERM avec une nouvelle chaîne de recherche
  const action = { type: 'SET_SEARCH_TERM', payload: 'search' };
  // Appel du réducteur avec l'état initial et l'action
  const newState = reducer(initialState, action);
  // Vérifie si l'état après l'action correspond à ce qui est attendu
  expect(newState.searchTerm).toBe('search');
});
