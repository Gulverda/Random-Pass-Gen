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

  const handleMouseMove = (e) => {
    const slider = e.target;
    const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;

    slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${percentage}%, #18171F ${percentage}%, #18171F 100%)`;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const passwordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return 'text-tooWeak';
      case 2:
        return 'text-weak';
      case 3:
        return 'text-medium';
      case 4:
        return 'text-strong';
    }
  }

  const cube = {
    width: '24px',
    height: '24px',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '32',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-backgroundForBack">
      <header className="text-textColor">
        <h1 style={{ fontSize: '24px' }}>Password Generator</h1>
      </header>
      <div style={{ width: '540px', height: '80px' }} className="bg-bgMain flex items-center text-left justify-between mt-8 pl-8 pr-8">
        <p className="my-4">
          <span style={{ fontSize: '32px', fontFamily: 'JetBrains Mono' }} className="text-secondaryText text-left">{password}</span>
        </p>
        <button onClick={copyToClipboard}>
          <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.909 0.659016L20.341 3.09098C20.763 3.51294 21 4.08523 21 4.68197V17.25C21 18.4926 19.9926 19.5 18.75 19.5H15V21.75C15 22.9926 13.9926 24 12.75 24H2.25C1.00734 24 0 22.9926 0 21.75V6.75C0 5.50734 1.00734 4.5 2.25 4.5H6V2.25C6 1.00734 7.00734 0 8.25 0H16.3181C16.9147 3.12036e-06 17.4871 0.237058 17.909 0.659016ZM2.53126 21.75H12.4687C12.5434 21.75 12.6149 21.7204 12.6677 21.6677C12.7204 21.6149 12.75 21.5434 12.75 21.4687V19.5H8.25C7.00734 19.5 6 18.4926 6 17.25V6.75H2.53126C2.45665 6.75 2.38512 6.77963 2.33238 6.83238C2.27963 6.88512 2.25 6.95665 2.25 7.03126V21.4687C2.25 21.5434 2.27963 21.6149 2.33238 21.6677C2.38512 21.7204 2.45665 21.75 2.53126 21.75ZM18.4687 17.25H8.53126C8.45665 17.25 8.38512 17.2204 8.33238 17.1677C8.27963 17.1149 8.25 17.0434 8.25 16.9687V2.53126C8.25 2.45665 8.27963 2.38512 8.33238 2.33238C8.38512 2.27963 8.45665 2.25 8.53126 2.25H13.5V6.375C13.5 6.99632 14.0036 7.5 14.625 7.5H18.75V16.9687C18.75 17.0434 18.7204 17.1149 18.6677 17.1677C18.6149 17.2204 18.5434 17.25 18.4687 17.25ZM15.75 5.25H18.75V4.7985C18.75 4.76156 18.7427 4.72499 18.7286 4.69086C18.7145 4.65673 18.6937 4.62572 18.6677 4.59961L16.4004 2.33236C16.3476 2.27963 16.2761 2.25 16.2014 2.25H15.75V5.25Z" fill="#A4FFAF" />
          </svg>

        </button>
      </div>
      <div style={{ width: '540px', height: '528px' }} className="bg-bgMain mt-6 p-8">
        <main className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col items-left w-full">
            <label htmlFor="passwordLength" className="mb-2 flex justify-between items-center">
              <span style={{ fontSize: '18px', fontWeight: '700' }} className="text-secondaryText font-JetBrains">Character Length:</span>
              <span style={{ fontSize: '32px' }} className="text-strong font-JetBrains">{passwordLength}</span>
            </label>
            <div className="flex items-center justify-between mt-4">
              <input
                type="range"
                id="passwordLength"
                name="passwordLength"
                min="0"
                max="20"
                value={passwordLength}
                onChange={handleLengthChange}
                onMouseMove={handleMouseMove}
                className="w-full mr-4"
              />
            </div>
          </div>


          <div className="flex-col justify-between w-full mt-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeUppercase"
                checked={includeUppercase}
                onChange={handleCheckboxChange}
                className="mr-2 hidden"
                id="includeUppercase"
              />
              <label style={{ fontSize: '18px', fontWeight: '700' }} htmlFor="includeUppercase" className="cursor-pointer flex items-center text-textColor font-JetBrains">
                <span className={`relative inline-block w-4 h-4 border mr-2 ${includeUppercase ? 'bg-strong border-strong' : 'border-secondaryText'}`}>
                  {includeUppercase && <svg className="absolute top-0 left-0 w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M6 11l3 3 6-6"></path>
                  </svg>}
                </span>
                Include Uppercase Letters
              </label>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeLowercase"
                checked={includeLowercase}
                onChange={handleCheckboxChange}
                className="mr-2 hidden"
                id="includeLowercase"
              />
              <label style={{ fontSize: '18px', fontWeight: '700' }} htmlFor="includeLowercase" className="cursor-pointer flex items-center text-textColor font-JetBrains mt-5">
                <span className={`relative inline-block w-4 h-4 border mr-2 ${includeLowercase ? 'bg-strong border-strong' : 'border-secondaryText'}`}>
                  {includeLowercase && <svg className="absolute top-0 left-0 w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M6 11l3 3 6-6"></path>
                  </svg>}
                </span>
                Include Lowercase Letters
              </label>

            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeNumbers"
                checked={includeNumbers}
                onChange={handleCheckboxChange}
                className="mr-2 hidden"
                id="includeNumbers"
              />
              <label style={{ fontSize: '18px', fontWeight: '700' }} htmlFor="includeNumbers" className="cursor-pointer flex items-center text-textColor font-JetBrains mt-5">
                <span className={`relative inline-block w-4 h-4 border mr-2 ${includeNumbers ? 'bg-strong border-strong' : 'border-secondaryText'}`}>
                  {includeNumbers && <svg className="absolute top-0 left-0 w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M6 11l3 3 6-6"></path>
                  </svg>}
                </span>
                Include Numbers

              </label>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeSymbols"
                checked={includeSymbols}
                onChange={handleCheckboxChange}
                className="mr-2 hidden"
                id="includeSymbols"
              />
              <label style={{ fontSize: '18px', fontWeight: '700' }} htmlFor="includeSymbols" className="cursor-pointer flex items-center text-textColor font-JetBrains mt-5">
                <span className={`relative inline-block w-4 h-4 border mr-2 ${includeSymbols ? 'bg-strong border-strong' : 'border-secondaryText'}`}>
                  {includeSymbols && <svg className="absolute top-0 left-0 w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M6 11l3 3 6-6"></path>
                  </svg>}
                </span>
                Include Symbols
              </label>

            </label>
          </div>
          <div className="flex items-center justify-between mt-8 w-full">
            <p style={{ fontSize: '18px', fontWeight: '700' }} className="text-textColor font-JetBrains">Password Strength:</p>
            <p className={`my-7 ${passwordStrengthColor()}`}>
              {passwordStrength === 1 ? '■' : passwordStrength === 2 ? '■■' : passwordStrength === 3 ? '■■■' : '■■■■'}
            </p>
          </div>


          <button style={{ fontWeight: '700', fontSize: '18px' }} className="bg-strong hover:bg-green-300 font-JetBrains text-backgroundForBack w-full py-5" onClick={generatePassword}>
            Generate
          </button>
          {/* <div>
            <h2>Last 10 Generated Passwords:</h2>
            <ul>
              {passwordHistory.map((password, index) => (
                <li key={index}>{password}</li>
              ))}
            </ul>
          </div> */}
        </main>
        {/* <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2021</p>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
