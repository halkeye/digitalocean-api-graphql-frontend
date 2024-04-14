module.exports = {
  "src": "./src",
  "schema": "./schema.graphql",
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  "language": "typescript",
  "requireCustomScalarTypes": true,
  "customScalarTypes": {
    "UUID": "string",
    "Time": "string",
    // "Time": {"name": "TimeScalarType", "path": "../TimeScalarType"}
  }
}
