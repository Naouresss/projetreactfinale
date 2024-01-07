// UserList.tsx

import React, { useReducer, useEffect, ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import './UserList.css';
import reducer from './reducer';

interface User {
  id: number;
  avatar_url: string;
  login: string;
  type: string;
}

interface State {
  users: User[];
  searchTerm: string;
}

const initialState: State = {
  users: [],
  searchTerm: '',
};

const UserList: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortKey, setSortKey] = useState<keyof User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://api.github.com/users');
        dispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.get<{ items: User[] }>(`https://api.github.com/search/users?q=${state.searchTerm}`);
  
      // Utilisez directement response.data.items car c'est là que se trouvent les utilisateurs dans le cas d'une recherche
      dispatch({ type: 'SET_USERS', payload: response.data.items });
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };
  
  

  const handleSort = (key: keyof User) => {
    setSortKey(key);
    const sortedUsers = [...state.users].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    dispatch({ type: 'SET_USERS', payload: sortedUsers });
  };

  const handlePageChange = (newPage: number) => {
    const apiUrl = `https://api.github.com/search/users?q=${state.searchTerm}&page=${newPage}`;
  
    axios.get<{ items: User[] }>(apiUrl)
      .then(response => {
        const users = response.data.items || response.data;  // Utilisez response.data.items si disponible, sinon response.data
        dispatch({ type: 'SET_USERS', payload: users });
        setCurrentPage(newPage);
      })
      .catch(error => {
        console.error('Erreur lors de la pagination:', error);
      });
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={state.searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Rechercher</button>
      </form>

      <div>
        <strong>Sort by:</strong>
        <button onClick={() => handleSort('login')}>Login</button>
        <button onClick={() => handleSort('type')}>Type</button>
      </div>

      <div>
        <strong>Recent Searches:</strong>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>id</th>
            <th onClick={() => handleSort('avatar_url')}>Avatar</th>
            <th onClick={() => handleSort('login')}>Login</th>
            <th onClick={() => handleSort('type')}>Type</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img src={user.avatar_url} alt={user.login} />
              </td>
              <td>{user.login}</td>
              <td>{user.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
