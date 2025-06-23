export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "node",
  roots: ["<rootDir>/src/server"],
  testTimeout: 15000 // 15 segundos timeout global para todas las pruebas
};