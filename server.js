import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const agendaPath = path.join("agenda.json");

app.get("/agenda", (req, res) => {
  fs.readFile(agendaPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error al leer agenda");
    res.json(JSON.parse(data));
  });
});

app.post("/agenda", (req, res) => {
  const nuevaAgenda = req.body;
  fs.writeFile(agendaPath, JSON.stringify(nuevaAgenda, null, 2), (err) => {
    if (err) return res.status(500).send("Error al guardar");
    res.send("Agenda guardada");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor GTbot corriendo en http://localhost:${PORT}`);
});
