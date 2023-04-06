import mongoose from 'mongoose'

const databaseUri = process.env.DATABASE_CONNECTION

const connection : Record<string, unknown> = {}

const sourceConnection = async () => {  
  try {
    if (connection.isConnected) {
      return
    }
    
    const db = await mongoose.connect(databaseUri!)


    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log('mongoError: ', (error as any).message)
  }
}

export default sourceConnection