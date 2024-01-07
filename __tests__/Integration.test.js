// Integration.test.js

// Teste d'intégration pour le scénario heureux
test('integration test for happy path', async () => {
  // Rend l'application (App)
  render(<App />);

  // Récupère les éléments d'entrée et de bouton par leur texte de substitution
  const inputElement = screen.getByPlaceholderText(/Rechercher un utilisateur/i);
  const buttonElement = screen.getByText(/Rechercher/i);

  // Simule une interaction utilisateur
  // Déclenche le changement de l'entrée
  userEvent.type(inputElement, 'testuser');
  // Déclenche le clic sur le bouton de recherche
  userEvent.click(buttonElement);

  // Attend les résultats
  const resultElement = await screen.findByText(/testuser/i);

  // Vérifie si l'élément résultat est présent dans le document
  expect(resultElement).toBeInTheDocument();
});

// Ajouter d'autres tests d'intégration pour d'autres scénarios
