import { createSchemaClass } from "./helpers/create-schema-class/create-schema-class.js";

export class Address extends createSchemaClass({
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string" },
    zip: { type: "string" },
  },
  // street 속성을 필수로 정의
  required: ["street"],
}) {}

export class Person extends createSchemaClass({
  type: "object",
  properties: {
    name: { type: "string" },
    address: Address, // 중첩된 Address 스키마
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
    },
    // null 허용하는 문자열 필드
    deletedAt: {
      type: ["string", "null"],
      default: null,
    },
  },
  required: ["name", "createdAt", "deletedAt"],
}) {}

const person = new Person({
  name: "John",
});

Person.parse(person);
Person.validate(person);
