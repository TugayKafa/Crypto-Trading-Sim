import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/users/${username}`);
      if (response.status === 200) {
        // Логин успешен -> навигирай към HomePage с username
        navigate(`/${username}`);
      }
    } catch (error) {
      alert('Грешно потребителско име или проблем с връзката');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
