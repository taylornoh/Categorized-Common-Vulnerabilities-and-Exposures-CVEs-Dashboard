let access_key = "cpsc454";
let value = prompt("Enter the access key to view this content:")

if (value !== access_key) {
  window.location.replace("./webpage_update.html");
}


async function searchVulnerabilities() {
  const companyName = document.getElementById('companyName').value.trim().toLowerCase();
  const companiesContainer = document.getElementById('company-list');
  const apiEndpoint = 'https://4n2ce5l1zi.execute-api.us-east-1.amazonaws.com/Deployment_Stage/fetch_dynamoDB_fulldata';
  const resultsContainer = document.getElementById('results');

  // Clear previous results
  resultsContainer.innerHTML = '';

  if (companyName === '') {
    resultsContainer.innerHTML = 'Please enter a company name.';
    // Show the company list if the search box is empty
    companiesContainer.style.display = 'block';
    return;
  } else {
    // Hide the company list when displaying search results
    companiesContainer.style.display = 'none';
  }

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const vulnerabilities = await response.json();
    const filteredVulnerabilities = vulnerabilities.filter(v => v.company.toLowerCase().includes(companyName));

    if (filteredVulnerabilities.length > 0) {
      displayProducts(filteredVulnerabilities); 
    } else {
      resultsContainer.innerHTML = 'No vulnerabilities found for the specified company.';
    }
  } catch (error) {
    resultsContainer.innerHTML = `Error retrieving vulnerabilities: ${error.message}`;
  }
}

document.getElementById('companyName').addEventListener('input', function(e) {
  const companiesContainer = document.getElementById('company-list');
  if (e.target.value.trim() === '') {
    companiesContainer.style.display = 'block';
  }
});

// This function could be called when the page loads to fetch and display unique company names
async function loadCompanyNames() {
  const apiEndpoint = 'https://4n2ce5l1zi.execute-api.us-east-1.amazonaws.com/Deployment_Stage/fetch_dynamoDB_fulldata'; // Endpoint to fetch companies
  const companiesContainer = document.getElementById('company-list');

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Create a set to store unique company names
    const uniqueCompanies = new Set(data.map(item => item.company));

    // Convert the Set back into an array for mapping over it
    companiesContainer.innerHTML = Array.from(uniqueCompanies).map(companyName => `
      <span class="company-name">${companyName}</span>
    `).join(', ');
  } catch (error) {
    companiesContainer.innerHTML = `Error retrieving companies: ${error.message}`;
  }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', loadCompanyNames);


function displayProducts(vulnerabilities) {
  const productContainer = document.getElementById('product-list');
  const uniqueProducts = new Set(vulnerabilities.map(vuln => vuln.product));
  productContainer.innerHTML = '';
  
  uniqueProducts.forEach(product => {
    const productButton = document.createElement('button');
    productButton.textContent = product;
    productButton.onclick = function() {
      displayVulnerabilitiesForProduct(vulnerabilities, product);
    };
    productContainer.appendChild(productButton);
  });
}

// This function displays vulnerabilities for a specific product
function displayVulnerabilitiesForProduct(vulnerabilities, productName) {
  const resultsContainer = document.getElementById('results');
  const filteredVulnerabilities = vulnerabilities.filter(v => v.product === productName);
  
  resultsContainer.innerHTML = filteredVulnerabilities.map(vuln => `
    <div class="vulnerability-frame">
      <h2 class="vulnerability-company">${vuln.company}</h2>
      <h3 class="vulnerability-name">${vuln.vulnerabilityName}</h3>
      <p class="vulnerability-product">${vuln.product}</p>
      <p class="vulnerability-description">${vuln.shortDescription}</p>
      <p class="vulnerability-id">ID: ${vuln.ID}</p>
    </div>
  `).join('');
}

// This function is called after searching for a company to display product buttons
function displayProducts(vulnerabilities) {
  const productContainer = document.getElementById('product-list');
  const uniqueProducts = new Set(vulnerabilities.map(vuln => vuln.product));
  productContainer.innerHTML = '';
  
  uniqueProducts.forEach(product => {
    const productButton = document.createElement('button');
    productButton.textContent = product;
    productButton.onclick = function() {
      displayVulnerabilities(vulnerabilities, product); // Pass the product to filter
    };
    productContainer.appendChild(productButton);
  });

  displayVulnerabilities(vulnerabilities, ''); // Display all vulnerabilities initially
}

// This function displays vulnerabilities for a specific product or all if productName is empty
function displayVulnerabilities(vulnerabilities, productName) {
  const resultsContainer = document.getElementById('results');
  let filteredVulnerabilities;

  if (productName) {
    // If a product name is provided, filter the vulnerabilities
    filteredVulnerabilities = vulnerabilities.filter(v => v.product === productName);
  } else {
    // If no product name is provided, show all vulnerabilities
    filteredVulnerabilities = vulnerabilities;
  }

  // Display vulnerabilities
  resultsContainer.innerHTML = filteredVulnerabilities.map(vuln => `
    <div class="vulnerability-frame">
      <h2 class="vulnerability-company">${vuln.company}</h2>
      <h3 class="vulnerability-name">${vuln.vulnerabilityName}</h3>
      <p class="vulnerability-product">${vuln.product}</p>
      <p class="vulnerability-description">${vuln.shortDescription}</p>
      <p class="vulnerability-id">ID: ${vuln.ID}</p>
    </div>
  `).join('');
}
