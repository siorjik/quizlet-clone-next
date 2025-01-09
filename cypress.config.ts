import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  video: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed')
          )

          if (!failures) fs.unlinkSync(results.video)
        }
      })
    },
  },
})
