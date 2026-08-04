#!/usr/bin/env node
import { convertEsmToCjs } from "../internal/convert-esm-to-cjs.js";

(async () => {
  await convertEsmToCjs();
})();
