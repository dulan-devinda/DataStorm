import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setOutput(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {  // change this to your actual backend URL
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to get prediction');

      const result = await response.json();
      setOutput(result);
    } catch (err) {
      console.error(err);
      alert("Error during prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>CSV Predictor</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>

      {loading && <p>Processing...</p>}

      {output && (
        <div>
          <h2>Prediction Output:</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
