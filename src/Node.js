const { log } = require('console');
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000; // Порт, на якому буде працювати сервер

// Розширення CORS для запитів з вашого клієнта (Angular)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Замініть на адресу вашого клієнта
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Шлях до JSON-файлу з даними
const dataFilePath = 'data.json';

// Розділ зчитування даних
app.get('/kayaks', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(data.kayaks);
});

// Розділ додавання даних
app.post('/kayaks', (req, res) => {
    const newData = req.body;
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    newData.id = data.kayaks.length + 1; // Припустимо, що id - це порядковий номер
    data.kayaks.push(newData);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ message: 'Дані успішно додані' });
});

// Розділ видалення даних
app.delete('/kayaks/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const index = data.kayaks.findIndex((kayak) => kayak.id === idToDelete);
    if (index !== -1) {
        data.kayaks.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
        res.json({ message: 'Дані успішно видалені' });
    } else {
        res.status(404).json({ message: 'Дані не знайдені' });
    }
});

app.listen(port, () => {
    console.log(`Сервер працює на порті ${port}`);
});
