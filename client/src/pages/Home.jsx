import { Button, Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import CreateToDo from "../components/CreateToDo";

export default function Home() {
  const [toDos, setToDos] = useState([]);
  const [isAddTodo, setIsAddTodo] = useState(false);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const res = await fetch("/api/v1/todo/list");
        const data = await res.json();
        setToDos(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToDos();
  }, []);

  const handleChecked = async (id, value) => {
    try {
      const res = await fetch(`/api/v1/todo?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !value }),
      });
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        setToDos((toDos) => {
          const updatedTodo = toDos.map((todo) => {
            if (todo.id == id) {
              return {
                ...todo,
                done: data.data.done,
              };
            }
            return todo;
          });
          return updatedTodo;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showAddTodo = async () => {
    setIsAddTodo(false);
  };

  const handleAddTodo = async (todo) => {
    setToDos((toDos) => [...toDos, todo]);
  };

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>ToDo</Table.HeadCell>
              <Table.HeadCell className="p-4">Status</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {toDos.map((toDo) => (
                <Table.Row
                  key={toDo.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {toDo.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {toDo.description}
                  </Table.Cell>
                  <Table.Cell className="p-4">
                    <Checkbox
                      onClick={() => {
                        handleChecked(toDo.id, toDo.done);
                      }}
                      {...(toDo.done ? { defaultChecked: true } : {})}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                    >
                      Delete
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <Button
          className={`mx-auto mt-10  ${isAddTodo ? "hidden" : ""}`}
          gradientDuoTone="purpleToBlue"
          onClick={() => setIsAddTodo(!isAddTodo)}
        >
          Create ToDo
        </Button>
        {isAddTodo && (
          <CreateToDo showAddTodo={showAddTodo} addTodo={handleAddTodo} />
        )}
      </div>
    </div>
  );
}
