import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//TESTANDO O CODIGO 
app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//VER TODOS OS USUARIOS
app.get("/users", async (req: Request, res: Response) => {
    try {
       
        const result = await db("users")

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
//CRIANDO NOVOS USUARIOS 
app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' inválido, deve ser string")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' inválido, deve ser string")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' inválido, deve ser string")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' inválido, deve ser string")
        }

        if (id.length < 1 || name.length < 1 || email.length < 1 || password.length < 1) {
            res.status(400)
            throw new Error("'id','name','email' e 'password' devem possuir no mínimo 1 caractere")
        }

        
        const newUser = {
            id:id,
            name:name,
            email:email,
            password:password
        }
        await db("users").insert(newUser)
        
        res.status(200).send("Cadastro realizado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
//CRIANDO NOVOS PRODUTOS
app.post("/product", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' inválido, deve ser string")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' inválido, deve ser string")
        }
        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' inválido, deve ser number")
        }
        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' inválido, deve ser string")
        }
        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' inválido, deve ser string")
        }

        if (id.length < 1 || name.length < 1 || description.length < 1 || imageUrl.length < 1) {
            res.status(400)
            throw new Error("'id','name','description' e 'imageUrl' devem possuir no mínimo 1 caractere")
        }

        
        const newProduct = {
            id:id,
            name:name,
            price:price,
            description:description,
            imageUrl:imageUrl
        }
        await db("product").insert(newProduct)
        
        res.status(200).send("Produto cadastrado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
//EDITANDO UM PRODUTO
app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl


        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }

        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (newName.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 1 caractere")
            }
        }
        if (newDescription !== undefined) {

            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }

            if (newDescription.length < 1) {
                res.status(400)
                throw new Error("'Description' deve possuir no mínimo 1 caractere")
            }
        }
        if (newImageUrl !== undefined) {

            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("'ImageUrl' deve ser string")
            }

            if (newImageUrl.length < 1) {
                res.status(400)
                throw new Error("'ImageUrl' deve possuir no mínimo 1 caractere")
            }
        }
        
        const [ product ] = await db.raw(`
            SELECT * FROM product
            WHERE id = "${idToEdit}";
        `) 

        if (product) {
            await db.raw(`
                UPDATE songs
                SET
                    id = "${newId || product.id}",
                    name = "${newName || product.name}",
                    description = "${newDescription || product.description}",
                    imageUrl = "${newImageUrl || product.imageUrl}",
                WHERE
                    id = "${idToEdit}";
            `)
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({ message: "Atualização realizada com sucesso" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



