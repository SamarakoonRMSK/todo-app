import { Button, Checkbox, Table, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import CreateToDo from "../components/CreateToDo";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Home() {
  const [toDos, setToDos] = useState([]);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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

  const handleDeleteTodo = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/v1/todo?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log(data.message);
      } else {
        setToDos((prev) => prev.filter((todo) => todo.id !== deleteId));
        setDeleteId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen">
      <div>
        <div className="container mx-auto px-4 py-10 text-center relative z-10">
          <h1 className="text-5xl md:text-5xl lg:text-7xl font-bold e text-blue-700 mb-6">
            Welcome to ToDo App
          </h1>
        </div>
        <div className="overflow-x-auto max-w-7xl mx-auto mt-10 p-3">
          <Table hoverable className="border-2 ">
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>ToDo</Table.HeadCell>
              <Table.HeadCell className="p-4">Status</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {toDos.map((toDo, index) => (
                <Table.Row
                  key={index}
                  className=" border-1 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                    {toDo.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
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
                    <Link
                      to={`/update-todo/${toDo.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                      onClick={() => {
                        setShowModal(true);
                        setDeleteId(toDo.id);
                      }}
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 dark:text-gray-200 text-gray-400 mb-4" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this todo?
            </h3>
            <div className="flex justify-center gap-5">
              <Button color="failure" onClick={handleDeleteTodo}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
