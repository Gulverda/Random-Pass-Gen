import React, { useState } from 'react';
import zxcvbn from 'zxcvbn'; // Import the zxcvbn library for password strength estimation

function App(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [passwordLength, setPasswordLength] = useState<number>(15); // State to manage password length
  const [passwordStrength, setPasswordStrength] = useState<number>(0); // State to manage password strength
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false); // Initially false

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*(?)-_=+{}[]|;:,.<>';
    
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setPasswordHistory(prevHistory => [newPassword, ...prevHistory.slice(0, 9)]);

    // Calculate password strength using zxcvbn
    const strength = zxcvbn(newPassword).score; // Score ranges from 0 to 4
    setPasswordStrength(strength);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    setPasswordLength(newLength);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    switch (name) {
      case 'includeUppercase':
        setIncludeUppercase(checked);
        break;
      case 'includeLowercase':
        setIncludeLowercase(checked);
        break;
      case 'includeNumbers':
        setIncludeNumbers(checked);
        break;
      case 'includeSymbols':
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  };

  const passwordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return 'text-red-500';
      case 1:
        return 'text-orange-500';
      case 2:
        return 'text-yellow-500';
      case 3:
        return 'text-green-500';
      case 4:
        return 'text-blue-500';
      default:
        return 'text-black';
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-backgroundForBack">
      <header className="text-textColor">
        <h1 style={{ fontSize: '24px' }}>Password Generator</h1>
      </header>
      <div style={{ width: '540px', height: '80px' }} className="bg-bgMain flex items-center text-left justify-between mt-8">
        <p className="my-4">
          <span style={{ fontSize: '32px', fontFamily: 'JetBrains Mono' }} className="text-secondaryText text-left">{password}</span>
        </p>
      </div>
      <div style={{ width: '540px', height: '528px' }} className="bg-bgMain mt-6">
        <main className="flex-1 flex flex-col justify-center items-center">
          <p className="text-center my-4">
            Welcome to the Random Password Generator. Click the button below to generate a random password.
          </p>
          <div className="flex justify-between w-full mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeUppercase"
                checked={includeUppercase}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Include Uppercase Letters
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeLowercase"
                checked={includeLowercase}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Include Lowercase Letters
            </label>
          </div>
          <div className="flex justify-between w-full mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeNumbers"
                checked={includeNumbers}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Include Numbers
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeSymbols"
                checked={includeSymbols}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Include Symbols
            </label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePassword}>
            Generate
          </button>
          <div>
            <h2>Last 10 Generated Passwords:</h2>
            <ul>
              {passwordHistory.map((password, index) => (
                <li key={index}>{password}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center mt-8">
            <label htmlFor="passwordLength" className="mb-2">Password Length:</label>
            <input
              type="range"
              id="passwordLength"
              name="passwordLength"
              min="6"
              max="30"
              value={passwordLength}
              onChange={handleLengthChange}
              className="w-64"
            />
            <p className={`my-7 ${passwordStrengthColor()}`}>
              Password Strength: {passwordStrength}/4
            </p>
          </div>
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2021</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
