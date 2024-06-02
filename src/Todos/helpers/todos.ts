import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };
  const todo = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
  return todo;
};


export const newTodo = async (description:string) : Promise<Todo>   =>{
  const body ={description}
  const todoBd = await fetch('http://localhost:3000/api/todo',{
    method:'POST',
    body:JSON.stringify(body),
    headers:{
      "Content-type":"aplication/json"
    }
  }).then(resp=>resp.json())
  return todoBd
}

export const deleteTodo = async () : Promise<boolean>   =>{
  const todoBd = await fetch('http://localhost:3000/api/todo',{
    method:'DELETE',
    headers:{
      "Content-type":"aplication/json"
    }
  }).then(resp=>resp.json())
  return true
}