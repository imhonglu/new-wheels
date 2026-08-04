#!/usr/bin/env node
import { loadSuiteLock, suiteCacheDirectory } from "../config.js";
import { syncTestSuite } from "../sync-test-suite.js";

const lock = await loadSuiteLock();
const checkedOutRevision = await syncTestSuite({
  cacheDirectory: suiteCacheDirectory,
  repository: lock.repository,
  revision: lock.revision,
});

console.info(`Synced JSON-Schema-Test-Suite at ${checkedOutRevision}`);
