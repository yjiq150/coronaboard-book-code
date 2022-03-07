const SheetApiClientFactory = require('./sheet_api_client_factory');

async function main() {
  try {
    await SheetApiClientFactory.create();
  } catch (e) {
    console.error(e);
  }
}

main();
