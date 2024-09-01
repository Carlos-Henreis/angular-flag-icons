import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { countryCodeMapping } from './country_code_mapping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Url of the Wikipedia page with the flags
const url = 'https://en.wikipedia.org/wiki/Gallery_of_sovereign_state_flags';

// make sure the output directory exists
const outputDir = path.join(__dirname, './projects/angular-material-icon-flags/src/lib/assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// download the flag and save it to the output directory
async function downloadFlag(countryCode, flagUrl) {
  try {
    const response = await axios.get(flagUrl, { responseType: 'arraybuffer' });

    if (response.headers['content-type'] === 'image/svg+xml') {
      const fileName = `${countryCode}.svg`;
      fs.writeFileSync(path.join(outputDir, fileName), response.data);
      console.log(`Downloaded and saved ${fileName}`);
    } else {
      console.error(`The downloaded file for ${countryCode} is not an SVG.`);
    }
  } catch (err) {
    console.error(`${flagUrl}`);
    console.error(`Failed to download SVG for ${countryCode}: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

// main function to download all flags
async function downloadAllFlags() {
  try {
    // To get the page content, we use axios to make an HTTP GET request to the URL
    const response = await axios.get(url);

    if (response.data) {
      const $ = cheerio.load(response.data);

      // Convert the list of flag images to an array of elements
      const elements = $('div.thumb img').toArray();

      for (const element of elements) {
        const img = $(element);
        const imgSrc = img.attr('src');
        const countryName = img.attr('alt')?.replace('Flag of ', '').trim();

        if (imgSrc && countryName) {
          const countryCode = countryCodeMapping[countryName];
          console.log(`Processing ${imgSrc}...`);
          const svgPath = imgSrc.replace(/\/\/upload\.wikimedia\.org\/wikipedia\/.*\/thumb/, '').replace(/\/\d+px-.+\.png$/, '');

          if (countryCode && svgPath) {
            const flagUrl = `https://upload.wikimedia.org/wikipedia/commons${svgPath}`;
            await downloadFlag(countryCode, flagUrl);  
          } else {
            console.error(`Country code not found for ${countryName} or SVG path not found for an element`);
          }
        } else {
          console.error(`Image source or country name not found for an element`);
        }
      }
    } else {
      console.error('Failed to retrieve the page content.');
    }
  } catch (err) {
    console.error(`Failed to fetch the page: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

// start the download process
downloadAllFlags().then(() => {
  console.log('All flags downloaded.');
});
