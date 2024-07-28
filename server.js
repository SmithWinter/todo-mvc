import jsonServer from 'json-server'
import fs from 'fs'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
/**
 * This function reads the 'db.json' file and parses its content into a JavaScript object.
 *
 * @returns {Object} - The parsed data from the 'db.json' file.
 * If an error occurs during the read operation, it logs the error to the console and returns an empty array.
 */
function readDatabase() {
  const databaseFile = fs.readFileSync('db.json', 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading db.json:', error)
      return []
    }
    console.log(data)
  })
  return JSON.parse(databaseFile)
}
/**
 * This function writes the provided task data to the 'db.json' file.
 *
 * @param {Array} inputData - An array of task objects to be written to the database.
 * Each task object should have the following properties:
 * - id: A unique identifier for the task.
 * - task: Task description.
 * - isFinished: A boolean indicating whether the task is completed.
 *
 * @returns {void} - The function does not return any value.
 * However, it logs the parsed data and a success message to the console if the write operation is successful.
 * If an error occurs during the write operation, it logs the error to the console.
 */
function writeDatabase(inputData) {
  try {
    const taskData = {
      taskList: inputData
    }
    const parsedData = JSON.stringify(taskData)
    fs.writeFileSync('db.json', parsedData, 'utf8')
    console.log(parsedData)
    console.log('File has been written successfully.')
  } catch (error) {
    console.error('Error writing file:', error)
  }
}
/**
 * This function marks all tasks in the database as completed.
 * It reads the current database using the `readDatabase` function,
 * maps through the task list, and sets the `isFinished` property to `true` for each task.
 * The modified data is then returned.
 *
 * @returns {Array} - An array containing the modified task list with all tasks marked as completed.
 */
function checkAllTask(status) {
  const database = readDatabase()
  const taskList = database.taskList
  if (status) {
    return taskList.map((item) => {
      return {
        ...item,
        isFinished: true
      }
    })
  } else {
    return taskList.map((item) => {
      return {
        ...item,
        isFinished: false
      }
    })
  }
}
/**
 * This function clears all completed tasks from the database.
 * It reads the current database using the `readDatabase` function,
 * filters out the completed tasks, and writes the modified data back to the database using the `writeDatabase` function.
 *
 * @returns {Array} - An array containing the modified task list with completed tasks removed.
 */
function clearCompletedTasks() {
  const database = readDatabase()
  const taskList = database.taskList
  const modifiedData = taskList.filter((item) => {
    if (!item.isFinished) {
      return item
    }
  })
  return modifiedData
}
/**
 * This is an asynchronous function that handles the '/clearCompletedTask' endpoint.
 * It clears all completed tasks from the database and sends back the modified data.
 *
 * @param {Object} req - The request object containing no parameters.
 * @param {Object} res - The response object to send back the modified data or error messages.
 *
 * @returns {Promise} - A Promise that resolves with the response object when the operation is successful.
 * If an error occurs during the operation, the Promise rejects with an error message.
 *
 * @throws Will throw an error if the database read or write operation fails.
 */
server.get('/clearCompletedTask', async (req, res) => {
  try {
    const modifiedData = clearCompletedTasks()
    writeDatabase(modifiedData)
    return res.status(200).send(modifiedData)
  } catch (err) {
    return res.status(400).send('Something went wrong')
  }
})
/**
 * This is an asynchronous function that handles the '/modifyAllTaskStatus' endpoint.
 * It modifies the status of all tasks in the database based on the provided query parameter.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send back the modified data or error messages.
 *
 * @returns {Promise} - A Promise that resolves with the response object when the operation is successful.
 * If an error occurs during the operation, the Promise rejects with an error message.
 */
server.get('/modifyAllTaskStatus', async (req, res) => {
  try {
    const status = req.query.status
    const modifiedData = checkAllTask(JSON.parse(status))
    writeDatabase(modifiedData)
    return res.status(200).send(modifiedData)
  } catch (err) {
    return res.status(400).send('Something went wrong')
  }
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
