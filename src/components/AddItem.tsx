import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import db from "@/lib/firestore";

const AddItem = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: value,
      });
      console.log("Document written with id", docRef.id);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
