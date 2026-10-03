import { useState } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const submitEWaste = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8001/ewaste?item_name=${encodeURIComponent(
        itemName
      )}&category=${encodeURIComponent(
        category
      )}&description=${encodeURIComponent(description)}`,
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

  const viewEWaste = async () => {
    const response = await fetch("http://127.0.0.1:8001/ewaste");
    const data = await response.json();

    setItems(data);
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

      <br />

      <button onClick={viewEWaste}>View E-Waste</button>

      <h2>Submitted E-Waste</h2>

      {items.map((item) => (
        <div key={item.id}>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
          <p>
            <strong>Item:</strong> {item.item_name}
          </p>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;