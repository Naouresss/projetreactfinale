// UnhappyPath.test.js

// Teste d'intégration pour le scénario malheureux
test('integration test for unhappy path', async () => {
  // Rend l'application (App)
  render(<App />);
  
  // Récupère les éléments d'entrée et de bouton par leur texte de substitution
  const inputElement = screen.getByPlaceholderText(/Rechercher un utilisateur/i);
  const buttonElement = screen.getByText(/Rechercher/i);

  // Simule une interaction utilisateur
  // Laisse l'entrée vide
  // Déclenche le clic sur le bouton de recherche
  userEvent.click(buttonElement);

  // Assurez-vous qu'un message d'erreur ou une gestion appropriée est en place
  const errorMessage = await screen.findByText(/Please enter a search term/i);
  expect(errorMessage).toBeInTheDocument();
});
