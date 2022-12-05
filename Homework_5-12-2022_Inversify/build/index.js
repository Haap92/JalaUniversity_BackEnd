"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_config_1 = require("./inversify.config");
var types_1 = require("./types");
var school = inversify_config_1.container.get(types_1.SCHOOL);
console.log(school.getStudent());
