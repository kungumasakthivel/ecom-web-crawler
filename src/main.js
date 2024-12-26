const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");

const targetUrl = 'https://www.amazon.in/s?k=phone';
// const targetUrl = 'https://www.amazon.in/s?k=phone&rh=n%3A976419031%2Cp_n_feature_twenty-nine_browse-bin%3A44349052031&dc&ds=v1%3AeXxvPoLxhjjjmb%2F878J3NWvvhfkOD9ZJI2DmBdR6Qv4&qid=1735116691&rnid=44349045031&ref=sr_nr_p_n_feature_twenty-nine_browse-bin_4'

let urlsToVisit = [targetUrl];

const maxCrawlLength = 20;

const crawler = async () => {
    let crawledCount = 0;

    for (; urlsToVisit.length > 0 && crawledCount <= maxCrawlLength;) {
        const currentUrl = urlsToVisit.shift();
        crawledCount++;

        try {
            const response = await axios.get(currentUrl);
            const $ = cheerio.load(response.data);

            const linkElements = $('h2.a-size-medium');

            linkElements.each((index, element) => {
                let url = $(element).text().trim();
                if (!url.startsWith('http')) {
                    url = targetUrl + url.replace(/^\//, '');
                }

                if (url.startsWith(targetUrl) && !urlsToVisit.includes(url)) {
                    urlsToVisit.push(url);
                }
                console.log(url)
            });
        } catch (error) {
            console.error(`Error fetching ${currentUrl}: ${error.message}`);
        }
    }
    writeURLToFile("output", urlsToVisit);
};

function writeURLToFile(fileName, listValues) {
    const content = listValues.join("\n");
    fs.writeFile(fileName+".txt", content, (err) => {
        if (err) {
            console.error("Error writing to file:", err.message);
        } else {
            console.log("File written successfully!");
        }
    });
}

crawler();
