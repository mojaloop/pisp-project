#!/usr/bin/env node

/**
 * @file wait-for.js
 * @description Waits for a given service's prerequisite services to be up and running.
 *   
 *  Observe the following Environment Variables:
 *  `WAIT_FOR_PROJECT_DIR`  - REQUIRED  The directory where the project files live. Usually this is, `/opt/<service_name>` or `/opt/<service_name>/src`
 *  `WAIT_FOR_SERVICE_NAME` - REQUIRED  The name of the service. Must refer to a key in `waitForFunctions` below
 *  `WAIT_FOR_RETRIES`      - OPTIONAL  How many times should we retry waiting for a service? _optional_ Defaults to 5
 *  `WAIT_FOR_RETRY_MS`     - OPTIONAL  How many ms to wait before retrying a service connection? _optional_ Defaults to 1000 (1 second)
 */

/**
 * waitForFunctions
 * Define the set of functions to wait for before a given service starts up
 */
const waitForFunctions = {
  // TODO: account-lookup-service waits for both SQL instances...
  // Perhaps we need a way to easily configure _which_ sql it should talk to
  'account-lookup-service': [
    // waitForMySQL
  ],
  'central-ledger': [
    waitForMySQL,
    waitForKafka,
    waitForObjectStore
  ],
  'central-settlement': [
    waitForMySQL,
    waitForKafka,
  ],
  // Add your service here
}


/**
 * @function printUsage
 * @description - Prints the usage of this script
 */
function printUsage() {
  console.warn(`Usage: ./wait-for.js\nThe following environment variables are required\nWAIT_FOR_PROJECT_DIR, WAIT_FOR_SERVICE_NAME`)
}



/**
 * @function wrapWithRetries
 * @description - Call the given function with a number of retries.
 * @param {fn} func - Async function to call with retries
 * @param {number} retries - Number of times to retry before returning an error if the func fails
 * @param {number} waitTimeMs - Ms time to wait before trying again
 */
async function wrapWithRetries(func, retries, waitTimeMs) {
  // console.error('trying func with retries:', func, retries)
  try {
    const result = await func()
    return result
  } catch (err) {
    if (retries > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(wrapWithRetries(func, retries -1, waitTimeMs)), waitTimeMs)
      })
    }

    console.error('Out of retries for func: ', func)
    throw err
  }
}

/**
 * 
 */
async function waitForMySQL() {
  const projectDir = process.env.WAIT_FOR_PROJECT_DIR
  // TODO: We need to dynamically set the `CLEDG` prefix here, or perhaps not worry about it
  const RC = require(projectDir + '/node_modules/rc')('CLEDG', require(`${projectDir}/config/default.json`))

  const knex = require(projectDir + '/node_modules/knex')({
    client: RC.DATABASE.DIALECT,
    connection: {
      host: RC.DATABASE.HOST.replace(/\/$/, ''),
      port: RC.DATABASE.PORT,
      user: RC.DATABASE.USER,
      password: RC.DATABASE.PASSWORD,
      database: RC.DATABASE.SCHEMA
    }
  });

  await knex.select(1)
  return 'MySQL Connected';
}

/**
 * @function waitForKafka
 * @description Waits for the kafka service to be up and running
 * TODO: implement
 */
async function waitForKafka() {
  // throw new Error('Could not connect to Kafka')
  return 'Kafka Connected';
}

/**
 * @function waitForObjectStore
 * @description Waits for the kafka service to be up and running
 * TODO: implement
 */
async function waitForObjectStore() {
  // throw new Error('Could not connect to Objectstore')
  return 'ObjectStore Connected';
}


async function main() {
  console.log("process.env is", process.env)
  console.log('args are', process.argv)

  const serviceName = process.env.WAIT_FOR_SERVICE_NAME;
  const projectDir = process.env.WAIT_FOR_PROJECT_DIR;

  // TODO: error if the above 2 are not set
  // TODO: check for node_modules directory, we can't find it at `${projectDir}/node_modules`, exit

  const internalServiceRetries = parseInt(process.env.WAIT_FOR_RETRIES || 5)
  const retryWaitMs = parseInt(process.env.WAIT_FOR_RETRY_MS || 1000)

  //Get the list of functions to run
  const functionList = waitForFunctions[serviceName]

  if (!functionList || functionList.length === 0) {
    console.error(`Found no functions for service: ${serviceName}.`);
    printUsage();
    process.exit(1);
  }

  const waitForErrors = [];
  const result = await Promise.all(functionList.map(async func => {
    return wrapWithRetries(func, internalServiceRetries, retryWaitMs)
    .then(result => result)
    .catch(err => waitForErrors.push(err))
  }))

  if (waitForErrors.length > 0) {
    console.error(`wait-for failed with the following errors:`)
    console.error(waitForErrors)
    process.exit(1);
  }

  console.log("wait-for result is", result)
  process.exit(0)
}

main()