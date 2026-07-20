import {
  defineSchema,
  type SchemaInstanceType,
} from "@imhonglu/json-schema-typed";

// 스키마 정의
const userSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name"],
});

// 타입 추론
type UserType = SchemaInstanceType<typeof userSchema>;
// { name: string; age?: number }

// 사용 예시
const user: UserType = {
  name: "John",
  age: 20, // ✅ 선택적 필드
};

// 에러 케이스
// @ts-expect-error name 필드는 필수입니다.
const invalidUser: UserType = {
  age: 20,
  // ❌ name 필드 누락
};
