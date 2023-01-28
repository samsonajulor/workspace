import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let urlLink = process.env.MONGODB_URI as string




//app server
export const connect = async () => {
  try {
    await mongoose.connect(urlLink)
    console.log('Connection to MongoDB database successful')
  } catch (err: any) {
    console.error('Could not connect to MongoDB database', err.message)
  }
}

//mongo memory server
export class MemoryServerClient {
  mongoServer
  connection

  constructor() {
    this.mongoServer = new MongoMemoryServer()
    this.connection = mongoose.connection
  }

  async connectDb() {
    await this.mongoServer.start()
    await mongoose.connect(this.mongoServer.getUri())
  }

  async stopDb() {
    await this.connection.dropDatabase()
    await this.connection.close()
    await this.mongoServer.stop()
  }
}
