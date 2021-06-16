import { setup } from './setup';

require("ts-node/register");

module.exports = async function() {
  // Call your initialization methods here.
  await setup();
  return null;
};
