const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para lidar com JSON no body das requisições
app.use(express.json());

let tasks = []; // Armazenamento em memória de tarefas
let currentId = 1; // Contador de IDs

// Rota para criar uma nova tarefa (POST /tasks)
app.post("/tasks", (request, response) => {
  let body = request.body; // Acessa o corpo da requisição

  if (!body.titulo) {
    return response.status(400).json({ message: "O título é obrigatório" });
  }

  let newTask = {
    id: currentId++, // Gera um novo ID
    titulo: body.titulo,
    descricao: body.descricao || "", // Descrição opcional
    status: body.status || "pendente", // Status opcional, padrão "pendente"
  };

  // Adiciona a nova tarefa à lista
  tasks.push(newTask);

  // Responde com a tarefa criada
  response.status(201).json(newTask);
});

// Rota para listar todas as tarefas (GET /tasks)
app.get("/tasks", (request, response) => {
  return response.status(200).json(tasks);
});

// Rota para listar uma tarefa por ID (GET /tasks/:id)
app.get("/tasks/:id", (request, response) => {
  let idRequest = request.params.id; // Acessa o ID nos parâmetros da URL
  const task = tasks.find((task) => task.id == idRequest);

  if (!task) {
    return response.status(404).json({ message: "Tarefa não encontrada" });
  }

  return response.status(200).json(task);
});

// Rota para deletar uma tarefa (DELETE /tasks/:id)
app.delete("/tasks/:id", (request, response) => {
    let idRequest = request.params.id; // Acessa o ID nos parâmetros da URL
    const task = tasks.find((task) => task.id == idRequest);
  
    if (!task) {
      return response.status(404).json({ message: "Tarefa não encontrada" });
    }
  
    const taskIndex = tasks.findIndex((task) => task.id == idRequest);

  //ARRAY.SPLICE(INDICE, NUMERO DE ITENS DELETADOS, ITEM A SER ADICIONADO)
  //quando splice a gente so coloca o indice e 1, estamo retirando somente o tem
    tasks.splice(taskIndex, 1);
    return response.status(200).json({ message: "Tarefa deletada com sucesso" });
  });

// Rota para atualizar uma tarefa inteira (PUT /tasks/:id)
app.put("/tasks/:id", (request, response) => {
    let idRequest = request.params.id; // Acessa o ID nos parâmetros da URL
    let body = request.body; // Acessa o corpo da requisição
  
    // Encontra o índice da tarefa no array
    const taskIndex = tasks.findIndex((task) => task.id == idRequest);
  
    if (taskIndex === -1) {
      return response.status(404).json({ message: "Tarefa não encontrada" });
    }

  
    // Atualiza todos os campos da tarefa encontrada
    tasks[taskIndex] = {
      id: idRequest, // Mantém o ID original
      titulo: body.titulo,
      descricao: body.descricao, 
      status: body.status 
    };
  
    // Retorna a tarefa atualizada
    return response.status(200).json(tasks[taskIndex]);
  });

// Rota para atualizar parcialmente uma tarefa (PATCH /tasks/:id)
app.patch("/tasks/:id", (request, response) => {
  let idRequest = request.params.id; // Acessa o ID nos parâmetros da URL
  let body = request.body; // Acessa o corpo da requisição

  const task = tasks.find((task) => task.id == idRequest);
  if (!task) {
    return response.status(404).json({ message: "Tarefa não encontrada" });
  }

  // Atualiza apenas os campos enviados
  if (body.title) task.title = body.title;
  if (body.description) task.description = body.description;
  if (body.status) task.status = body.status;

  return response.status(200).json(task);
});

// Rota para marcar uma tarefa como "feito" (PATCH /tasks/done/:id)
app.patch("/tasks/done/:id", (request, response) => {
    let idRequest = request.params.id; // Acessa o ID nos parâmetros da URL
    const task = tasks.find((task) => task.id == idRequest);
  
    if (!task) {
      return response.status(404).json({ message: "Tarefa não encontrada" });
    }
  
    if (task.status === "feito") {
      return response.status(400).json({ message: "A tarefa já está marcada como 'feito'" });
    }
  
    // Altera o status da tarefa para "feito"
    task.status = "feito";
  
    return response.status(200).json({ message: "Tarefa marcada como 'feito'", task });
  });



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
