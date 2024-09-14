const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    video: true, // Enable video recording
    screenshotOnRunFailure: true, // Enable screenshots on test failures
    videoCompression: 32, // Optional: Adjust video compression (0 for no compression, 32 for default)
    screenshotsFolder: 'cypress/screenshots', // Custom path for screenshots
    videosFolder: 'cypress/videos', // Custom path for videos
    videoUploadOnPasses: false, // Do not upload videos if tests pass (useful in CI environments)
    
    setupNodeEvents(on, config) {
      // Add any plugins or event listeners here
      on('after:run', (results) => {
        const resultsPath = path.join('cypress', 'results', 'test-results.json');
        
        // Ensure the results directory exists
        if (!fs.existsSync(path.dirname(resultsPath))) {
          fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
        }
        
        // Write the JSON results to a file
        fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
      });
    },
    
    // Additional configuration options can go here
  },
});
