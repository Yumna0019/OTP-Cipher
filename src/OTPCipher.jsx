import { useState } from "react";
import "./OTPCipher.css";

const OTPCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const generateKey = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const stringEncryption = (text, key) => {
    let cipherText = "";
    let cipher = [];

    for (let i = 0; i < text.length; i++) {
      cipher[i] = text.charCodeAt(i) - "A".charCodeAt(0) + key.charCodeAt(i) - "A".charCodeAt(0);
      if (cipher[i] > 25) cipher[i] -= 26;
      cipherText += String.fromCharCode(cipher[i] + "A".charCodeAt(0));
    }
    return cipherText;
  };

  const stringDecryption = (cipher, key) => {
    let plainText = "";
    let plain = [];

    for (let i = 0; i < cipher.length; i++) {
      plain[i] = cipher.charCodeAt(i) - "A".charCodeAt(0) - (key.charCodeAt(i) - "A".charCodeAt(0));
      if (plain[i] < 0) plain[i] += 26;
      plainText += String.fromCharCode(plain[i] + "A".charCodeAt(0));
    }
    return plainText;
  };

  const handleEncrypt = () => {
    if (text.length !== key.length) {
      alert("Key length must match the text length!");
      return;
    }
    setResult(stringEncryption(text.toUpperCase(), key.toUpperCase()));
  };

  const handleDecrypt = () => {
    if (text.length !== key.length) {
      alert("Key length must match the text length!");
      return;
    }
    setResult(stringDecryption(text.toUpperCase(), key.toUpperCase()));
  };

  const handleKeyGeneration = () => {
    if (!text) {
      alert("Enter text first to generate a key!");
      return;
    }
    setKey(generateKey(text.trim().length));
  };

  return (
    <div className="otp-container">
      <h1>One-Time Pad Cipher</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={text.toUpperCase()}
        onChange={(e) => setText(e.target.value.toUpperCase())}
      />
      <input
        type="text"
        placeholder="Enter key (same length as text)"
        value={key}
        onChange={(e) => setKey(e.target.value.toUpperCase())}
      />
      <div className="btn-group">
        <button className="full-width" onClick={handleKeyGeneration}>
          Generate Key
        </button>
        <div className="row">
          <button  onClick={handleEncrypt}>
            Encode
          </button>
          <button  onClick={handleDecrypt}>
            Decode
          </button>
        </div>
      </div>
      {result && <div className="result-box"><span> Result: </span>{result}</div>}
    </div>
  );
};

export default OTPCipher;
