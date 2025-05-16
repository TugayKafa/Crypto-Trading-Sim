import React from 'react';
import { useParams } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';

function HomePage() {
  const { username } = useParams();  // тук се взема username от URL-а

  return (
    <div>
      <h1>Добре дошъл, {username}!</h1>
      <CryptoTable />
    </div>
  );
}

export default HomePage;
