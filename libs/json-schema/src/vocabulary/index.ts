import { keywordHandler } from "./keyword-handler.js";

import "./applying-sub-schema/properties.js";
import "./applying-sub-schema/additional-properties.js";
import "./applying-sub-schema/pattern-properties.js";
import "./applying-sub-schema/property-names.js";

import "./applying-sub-schema/items.js";
import "./applying-sub-schema/contains.js";
import "./applying-sub-schema/prefix-items.js";

import "./format/format.js";

import "./string-encoded-data/content-encoding.js";
import "./string-encoded-data/content-media-type.js";
import "./string-encoded-data/content-schema.js";

import "./structural-validation/const.js";
import "./structural-validation/enum.js";
import "./structural-validation/type.js";

import "./structural-validation/multiple-of.js";
import "./structural-validation/maximum.js";
import "./structural-validation/exclusive-maximum.js";
import "./structural-validation/minimum.js";
import "./structural-validation/exclusive-minimum.js";

import "./structural-validation/max-length.js";
import "./structural-validation/min-length.js";
import "./structural-validation/pattern.js";

import "./structural-validation/max-items.js";
import "./structural-validation/min-items.js";
import "./structural-validation/unique-items.js";

import "./structural-validation/max-properties.js";
import "./structural-validation/min-properties.js";
import "./structural-validation/required.js";
import "./structural-validation/dependent-required.js";

import "./core/defs.js";
import "./core/ref.js";

export { keywordHandler };
