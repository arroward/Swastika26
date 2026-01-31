const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '../src/data/config');
const outputFile = path.join(__dirname, '../public/data.json');

const files = [
    'site.json',
    'app.json',
    'hero.json',
    'proshows.json',
    'about.json',
    'footer.json',
    'autoshow.json',
    'tickets.json',
    'developers.json',
    'pass.json',
    'cta_marquee.json',
    'events.json'
];

function mergeConfig() {
    let combinedData = {};

    files.forEach(file => {
        const filePath = path.join(configDir, file);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            combinedData = { ...combinedData, ...data };
        } else {
            console.warn(`Warning: ${file} not found in ${configDir}`);
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(combinedData, null, 4));
    console.log(`Successfully merged configuration to ${outputFile}`);
}

mergeConfig();
