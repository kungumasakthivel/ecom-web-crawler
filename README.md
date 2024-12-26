# Web Crawler for E-commerce website

This web crawler will fetch products links of mobile phone's from amazon website. This crawler is specifically written to fetch mobile phone links from amazon because of their class and hyperlink constrains.

Different e-com website's HTML page contains different class name, this main.js program will helpful to crawl mobile phone links from amazon.in website phone category.

To run the crawler,

* Clone the repo
* On root diectory, in terminal
  * npm install
  * npm start

The target URL is specified in `targetUrl` variable. You can also mention different amazon.in mobile category URLs to crawl differnet products link.

Output of the crawler is written in `output.txt` file where you can find products absolute link, it will direactly open the product page in browser. It also contains product products specification in the same line. Each unique products is placed one after another in `output.txt` file.
