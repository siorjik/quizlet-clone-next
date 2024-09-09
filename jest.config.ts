import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({ dir: './' })
 
const config: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^jose": "jose",
    '^@panva/hkdf': '@panva/hkdf',
    '^uuid': 'uuid'
  }
}
 
export default createJestConfig(config)
