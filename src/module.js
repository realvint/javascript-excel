console.log('Module.js')

async function start() {
  return await Promise.resolve('работает')
}

start().then(console.log)