function App() {
  
  const call = async () => {
    const res = await fetch("https://localhost:44387/brainz?name=eminem")
    const data = res.json();
    console.log(data);
    return data;
  }
  
  return (
    <div className="App">
      <header className="App-header">
       <input type="text"/>
       <button onClick={call}>Search</button>
      </header>
    </div>
  );
}

export default App;
