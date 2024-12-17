const Application = require('src/app/Application');
const app = new Application();

(async () => {
  try {
    await app.loadSetup();
    await app.start();
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
})();
