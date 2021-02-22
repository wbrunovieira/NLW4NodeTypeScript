import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.json({message:"Hello World - NLW4"})
})

app.post("/", (req, res) => {
    return res.json({message: "dados salvos com sucesso !"})
})

app.listen(3333, () => console.log("Server is running !!!!"));