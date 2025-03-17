const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.json());


/*Agregamos el formato con los libros */
let books = [
  { id: 1, title: "Mi lucha" },
  { id: 2, title: "Berserk" },
];



/*Get books */
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  res.json(book);
});

/*Post books */
app.post("/books", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Debe ingresar un titulo" });
  }

  const newBook = {
    id: books.length + 1,
    title,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/*actualizar libro  */

app.put("/books/:id", (req, res) => {
  const { title } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  if (!title) {
    return res.status(400).json({ message: "ingrese un titulo" });
  }

  book.title = title;
  res.json(book);
});

/*eliminar un libro */
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  books.splice(bookIndex, 1);
  res.json({ message: "Libro eliminado correctamente" });
});

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
