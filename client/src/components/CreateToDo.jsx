import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function CreateToDo({ showAddTodo, addTodo }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || formData.description == null) {
      console.log("All fields are required");
      return;
    }
    try {
      const res = await fetch("/api/v1/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      showAddTodo();
      const data = await res.json();
      if (res.ok) {
        addTodo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 mx-auto"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="ToDo" />
          </div>
          <TextInput
            id="description"
            type="text"
            placeholder="Type here..."
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            required
            shadow
          />
        </div>

        <Button className="mt-5" type="submit" gradientDuoTone="purpleToBlue">
          Add ToDo
        </Button>
      </form>
    </div>
  );
}
