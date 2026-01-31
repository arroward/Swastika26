const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, '../src/data/config.template');
const targetDir = path.join(__dirname, '../src/data/config');

function initConfig() {
    if (!fs.existsSync(targetDir)) {
        console.log('Creating ignored config directory...');
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const files = fs.readdirSync(templateDir);
    files.forEach(file => {
        const targetFile = path.join(targetDir, file);
        if (!fs.existsSync(targetFile)) {
            console.log(`Copying template: ${file} -> config/`);
            fs.copyFileSync(path.join(templateDir, file), targetFile);
        }
    });

    console.log('Configuration initialized for build.');
}

initConfig();

// Also run the merge script to update public/data.json
require('./merge-config.js');
