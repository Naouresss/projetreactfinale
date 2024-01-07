// E2ETest.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('end-to-end test simulating user search interaction', async () => {
  // 1. Rendre votre application
  render(<App />);

  // 2. Trouver les éléments d'interface utilisateur
  const inputElement = screen.getByPlaceholderText(/Rechercher un utilisateur/i);
  const buttonElement = screen.getByText(/Rechercher/i);

  // 3. Simuler une interaction utilisateur
  userEvent.type(inputElement, 'testuser'); // Simulation de la saisie de l'utilisateur
  userEvent.click(buttonElement); // Simulation du clic sur le bouton de recherche

  // 4. Vérifier le résultat attendu
  // Attendez-vous à ce que les résultats de la recherche soient affichés
  const resultElement = await screen.findByText(/testuser/i);
  expect(resultElement).toBeInTheDocument();
});
