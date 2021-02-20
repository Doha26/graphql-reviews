"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var gql = require('apollo-server').gql;
var typeDefs = gql(__makeTemplateObject(["\n\n    type Item {\n        id: ID!\n        name: String\n        phone: String,\n        email: String!,\n        home_address: String,\n        gender: Gender,\n        picture_url: String\n    }\n\n    type Review {\n        id:ID!\n        rate: Int!\n        reviewer: String!\n        assigned_to: String\n        title: String!\n        content: String\n        created_at: String!\n        public_url: String!\n    }\n\n    enum Gender {\n        MALE\n        FEMALE\n        OTHER\n    }\n"], ["\n\n    type Item {\n        id: ID!\n        name: String\n        phone: String,\n        email: String!,\n        home_address: String,\n        gender: Gender,\n        picture_url: String\n    }\n\n    type Review {\n        id:ID!\n        rate: Int!\n        reviewer: String!\n        assigned_to: String\n        title: String!\n        content: String\n        created_at: String!\n        public_url: String!\n    }\n\n    enum Gender {\n        MALE\n        FEMALE\n        OTHER\n    }\n"]));
module.exports = typeDefs;
