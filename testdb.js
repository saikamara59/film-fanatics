const mongoose = require('mongoose')
const connectionString = "mongodb+srv://testuser:testuser1234@cluster0.rptky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const noteSchema = mongoose.Schema({
    body: String
}, {timestamps:true})

const Note = mongoose.model('Note', noteSchema)

const connect = async () => {

    await mongoose.connect(connectionString)
    db = mongoose.connection
    
    db.on('connected', ()=>console.log('connected to '+db.host))
    db.on('error', (err)=>console.log(err))

    await testDB()

    process.exit()
}


const testDB = async () => {
    try {
        // const newNote = await Note.create({body: "test 1"})
        // console.log(newNote)
        const allNotes = await Note.find({})
        console.log(allNotes)
    }catch (err){
        console.log('error')
    }
}

connect()