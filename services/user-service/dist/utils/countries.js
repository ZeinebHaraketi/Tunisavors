"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCode = void 0;
const countries_json_1 = __importDefault(require("../data/countries.json"));
const countries = countries_json_1.default;
const getCountryCode = (countryName) => {
    const code = countries[countryName.toLowerCase()];
    return code ?? countryName.toLowerCase();
};
exports.getCountryCode = getCountryCode;
