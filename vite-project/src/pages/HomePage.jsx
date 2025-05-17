import { useParams } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';

function HomePage() {
  const { username } = useParams();

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <CryptoTable />
    </div>
  );
}

export default HomePage;
