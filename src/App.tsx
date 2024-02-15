import React, { useState } from 'react';

function App(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);

  const generatePassword = () => {
    const length = 15; // Length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to include in the password
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setPasswordHistory(prevHistory => [newPassword, ...prevHistory.slice(0, 14)]);
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col justify-between">
      <header className="App-header bg-gray-800 text-white py-4">
        <h1 className="text-3xl text-center">Random Password Generator</h1>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <p className="text-center my-4">
          Welcome to the Random Password Generator. Click the button below to generate a random password.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePassword}>
          Generate Password
        </button>
        <p className="my-4">
          Your random password will appear here:
          <span className="bg-gray-200 p-2 ml-2 rounded">{password}</span>
        </p>
        <div>
          <h2>Last 10 Generated Passwords:</h2>
          <ul>
            {passwordHistory.map((password, index) => (
              <li key={index}>{password}</li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2021</p>
      </footer>
    </div>
  );
}

export default App;