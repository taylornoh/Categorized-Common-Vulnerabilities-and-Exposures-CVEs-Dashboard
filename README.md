# Categorized-Common-Vulnerabilities-and-Exposures-CVEs-Dashboard
Our project bridges the gap between common vulnerabilities and the public with a live dashboard on AWS. Users access recent vulnerabilities from tech giants, with real-time updates and solutions. AWS facilitates data collection via Amazon S3 and stores info in DynamoDB.

Project Deliverables:

* AWS: As the core clouding platform, AWS will be responsible for data storage, computing, and hosting our dashboard.
* Amazon DynamoDB: This will serve as our primary database, storing a catalog of vulnerabilities reported by different companies.
* Amazon S3: Leveraged as the primary hosting solution for our static website which will fetch and display the data.

Skills Needed:

* JSON Web Service: Required for handling and parsing data from vulnerability reports.
* SQL: Essential for managing, querying, and maintaining the DynamoDB.
* PHP/JS: Necessary for website development and ensuring dynamic data representation on the frontend.

10 Weeks Plan/Schedule:

Week 1-2: Project Initialization

* Setting up an AWS account.
* Initial database structure design.
* Exploratory data analysis of the JSON vulnerability feed.

Week 3-4: Data Ingestion & Processing

* Lambda function development for data scraping.
* Storing the scraped data into DynamoDB.
* Setting up CloudWatch for timely data updates.

Week 5-6: Front-end Development

* Initial website design and layout.
* Integration of Chart.js or any other data visualization libraries.
* Mobile responsiveness testing.

Week 7: Back-end Development (if necessary)

* Setup of the PHP or other server-side environment.
* API endpoint creation for fetching data from DynamoDB.

Week 8: Integration & Testing

* Integrate the front-end with the back-end.
* Ensure real-time data fetching and representation.
* Perform vulnerability and load tests on the website.

Week 9: Feedback & Iteration

* User testing.
* Gathering feedback and making necessary changes.

Week 10: Finalization & Deployment

* Final review and tests.
* Deployment of the website on Amazon S3.
* Documentation and report preparation.

Task Allocation within Group Members:

* AWS & Database Management:
* Member A: In charge of setting up AWS, DynamoDB configuration, and ensuring data integrity.

Data Ingestion & Processing:
* Member B: Focus on scraping the JSON vulnerability feed, data processing, and feeding into DynamoDB.

Front-end Development:
* Member C: Responsible for website layout, design, and integrating data visualization tools.

Back-end Development:
* Member D: If a server-side environment is deemed necessary, this member will handle the API endpoint creation and data fetching.

Testing & Feedback:
* Member E: Ensures that the website is tested for vulnerabilities, usability, and gathers feedback for improvement.
