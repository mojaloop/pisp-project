#!/usr/bin/env node

const { execSync } = require('child_process')

/**
 * @file _wait4_all.js
 * @description Waits for all docker-compose services to be running and healthy
 */


// Define the docker-compose containers you want to monitor here
const expectedContainers = [
  'account-lookup-service',
  'central-ledger',
  'kafka',
  'ml-api-adapter',
  'mysql',
  'mysql_als',
  'objstore',
  'quoting-service',
  'simulator',
  'transaction-requests-service',
]

let retries = 15;
let waitTimeMs = 10000;

async function main() {
  let waitingMap = {}
  // serviceName => status, where status is unknown, healthy, unhealthy or starting
  expectedContainers.forEach(serviceName => {
    waitingMap[serviceName] = 'unknown'
  })

  try {
    while (retries > 0) {
      await updateServiceStatus(waitingMap)

      if (isSystemHealthy(waitingMap)) {
        console.log("Services are healthy. Time to get to work!")
        process.exit(0)
      }

      if (isSystemFailing(waitingMap)) {
        console.error("Services went to unhealthy", Object.keys(waitingMap).filter(k => waitingMap[k] === 'unhealthy'))
        process.exit(1)
      }

      console.log("Still waiting for service health. Retries", retries)
      const healthyCount = Object
        .keys(waitingMap)
        .filter(k => waitingMap[k] === 'healthy').length
      console.log(`${healthyCount} services are healthy. Expected: ${expectedContainers.length}`)
      console.log('Waiting for', Object.keys(waitingMap).filter(k => waitingMap[k] === 'starting'))


      await sleep(waitTimeMs)
      retries--
    }

    console.error("Out of retries waiting for service health" )
    console.error("These services didn't start up in time:" )
    console.error(Object.keys(waitingMap).filter(k => waitingMap[k] === 'starting'))

    process.exit(1)
  } catch (error) {
    console.error(`wait4_all Error: ${error}`)
    process.exit(1)
  }
}


/**
 * @function updateServiceStatus
 * @description Go through all of the waiting services, and check their status
 * @param {*} waitingMap 
 */
async function updateServiceStatus(waitingMap) {
  Promise.all(Object.keys(waitingMap).map(async serviceName => {
    const currentStatus = waitingMap[serviceName]
    if (currentStatus === 'healthy' || currentStatus === 'unhealthy') {
      //Do nothing, we already have a final state for this container
      return;
    }

    const progress = await getProgress(serviceName);
    waitingMap[serviceName] = progress;
  }))
}

/**
 * @function getProgress
 * @description Invokes the `docker inspect` command for the given container
 * @param {string} containerName
 * @returns {'healthy' | 'unhealthy' | 'starting'}
 */
function getProgress(containerName) {
  const command = `docker inspect --format='{{json .State.Health.Status}}' ${containerName}`
  const result = execSync(command).toString().replace(/['"]+|[\n]+/g, '')

  return result
}

/**
 * @function isSystemHealthy
 * @param {*} waitingMap
 * @returns {boolean}
 */
function isSystemHealthy(waitingMap) {
  const healthyCount = Object
    .keys(waitingMap)
    .filter(k => waitingMap[k] === 'healthy').length

  return healthyCount === expectedContainers.length
}

/**
 * @function isSystemFailing
 * @param {*} waitingMap 
 * @returns {boolean}
 */
function isSystemFailing(waitingMap) {
  const unhealthyCount = Object
    .keys(waitingMap)
    .filter(k => waitingMap[k] === 'unhealthy').length

  if (unhealthyCount > 0) {
    return true;
  }

  return false;
}

/**
 * @function sleep
 * @param {*} timeMs - how long to sleep for
 */
async function sleep(timeMs) {
  console.log(`Sleeping for ${timeMs} ms`);
  return new Promise((resolve, reject) => setTimeout(() => resolve(), timeMs))
} 

main()