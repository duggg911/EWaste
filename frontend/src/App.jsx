import { useState } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const submitEWaste = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8001/ewaste?item_name=${encodeURIComponent(itemName)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    alert(`EWaste submitted successfully! ID: ${data.id}`);

    setItemName("");
    setCategory("");
    setDescription("");
  };

  return (
    <div>
      <h1>EWaste Management</h1>
      <p>Submit your electronic waste for recycling.</p>

      <form onSubmit={submitEWaste}>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Submit E-Waste</button>
      </form>
    </div>
  );
}

export default App;