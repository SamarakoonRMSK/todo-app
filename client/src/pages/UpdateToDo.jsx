import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateToDo({}) {
  const [formData, setFormData] = useState({});
  const { todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getTodo = async () => {
        const res = await fetch(`/api/v1/todo/${todoId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data.data);
        }
      };
      getTodo();
    } catch (error) {
      console.log(error);
    }
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || formData.description == null) {
      console.log("All fields are required");
      return;
    }
    try {
      const res = await fetch(`/api/v1/todo?id=${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 mx-auto"
      >
        <div>
          <div className="mb-2 block">
            <Label value="ID" />
          </div>
          <TextInput
            id="id"
            value={formData.id ?? ""}
            type="number"
            required
            shadow
            disabled
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="ToDo" />
          </div>
          <TextInput
            id="description"
            type="text"
            value={formData.description ?? ""}
            placeholder="Type here..."
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            required
            shadow
          />
        </div>

        <Button className="mt-5" type="submit">
          Update ToDo
        </Button>
      </form>
    </div>
  );
}
