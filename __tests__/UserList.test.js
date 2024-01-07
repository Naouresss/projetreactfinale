// UserList.test.js

// Teste si le composant UserList est rendu correctement
test('renders UserList component', () => {
  // Rend le composant UserList
  render(<UserList />);

  // Récupère l'élément d'entrée par son attribut de texte de substitution
  const inputElement = screen.getByPlaceholderText(/Rechercher un utilisateur/i);

  // Récupère l'élément de bouton par son texte
  const buttonElement = screen.getByText(/Rechercher/i);

  // Vérifie si l'élément d'entrée est présent dans le document
  expect(inputElement).toBeInTheDocument();

  // Vérifie si l'élément de bouton est présent dans le document
  expect(buttonElement).toBeInTheDocument();
});
