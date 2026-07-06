import CategoryExpense from "../models/categoryExpense.js"

const defaultCategories = [
    { name: "Alimentação", isDefault: true },
    { name: "Transporte", isDefault: true },
    { name: "Hospedagem", isDefault: true },
    { name: "Passeios/Lazer", isDefault: true },
    { name: "Passagens", isDefault: true },
    { name: "Emergência", isDefault: true }
]

const seedCategories = async () => {
    try {
        const count = await CategoryExpense.countDocuments({ isDefault: true })
        
        if (count === 0) {
            await CategoryExpense.insertMany(defaultCategories)
            console.log("Categorias criadas sucesso!")
        } else {
            console.log("Categorias padrão já existem no banco.")
        }
    } catch (error) {
        console.error("Erro ao criar categorias padrão:", error)
    }
}

export default seedCategories