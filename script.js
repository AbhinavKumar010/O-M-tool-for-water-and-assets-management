document.addEventListener('DOMContentLoaded', () => {
    const assets = [
        { id: 1, name: 'Pump Station 1', imageUrl: 'assets/pump.jpeg', coordinates: [28.7041, 77.1025], type: 'Pump', description: 'Main pump station for water supply.' },
        { id: 2, name: 'Pump 2', imageUrl: 'assets/pump.jpeg', coordinates: [28.5355, 77.3910], type: 'Pump', description: 'Secondary pump for backup.' },
        { id: 3, name: 'Filter Unit 3', imageUrl: 'assets/filter.jpeg', coordinates: [19.0760, 72.8777], type: 'Filter', description: 'Filter unit for purifying water.' }
    ];

    const map = L.map('map').setView([28.7041, 77.1025], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markers = [];

    function updateMarkers(filteredAssets) {
        markers.forEach(marker => marker.remove());
        markers = [];

        filteredAssets.forEach(asset => {
            const marker = L.marker(asset.coordinates).addTo(map)
                .bindPopup(`
                    <div>
                        <h3>${asset.name}</h3>
                        <p><strong>Type:</strong> ${asset.type}</p>
                        <p>${asset.description}</p>
                        <img src="${asset.imageUrl}" alt="${asset.name}" style="width: 100%; height: auto;">
                    </div>
                `)
                .on('click', () => {
                    showAssetImage(asset);
                });
            markers.push(marker);
        });
    }

    function showAssetImage(asset) {
        const selectedAssetImage = document.getElementById('selected-asset-image');
        selectedAssetImage.src = asset.imageUrl;
        selectedAssetImage.alt = asset.name;
        selectedAssetImage.style.display = 'block';
    }

    // Initialize with all assets
    updateMarkers(assets);

    document.getElementById('asset-filter').addEventListener('change', (e) => {
        const filterValue = e.target.value;
        const filteredAssets = filterValue === 'all' ? assets : assets.filter(asset => asset.type === filterValue);
        updateMarkers(filteredAssets);
    });

    document.getElementById('asset-search').addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredAssets = assets.filter(asset => asset.name.toLowerCase().includes(searchValue));
        updateMarkers(filteredAssets);
    });

    // Finance Summary
    const financeSummary = {
        totalRevenue: 50000,
        totalExpenses: 20000
    };

    function updateFinanceSummary() {
        const balance = financeSummary.totalRevenue - financeSummary.totalExpenses;
        document.getElementById('finance-summary').innerHTML = `
            <h3>Finance Summary</h3>
            <p>Total Revenue: ₹${financeSummary.totalRevenue.toFixed(2)}</p>
            <p>Total Expense: ₹${financeSummary.totalExpenses.toFixed(2)}</p>
            <p>Balance: ₹${balance.toFixed(2)}</p>
        `;
    }

    updateFinanceSummary();
});

// Function to load and initialize the map
function initializeMap() {
    const map = L.map('map').setView([28.7041, 77.1025], 5); // Set map center and zoom level

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for assets
    assets.forEach(asset => {
        const marker = L.marker(asset.coordinates).addTo(map)
            .bindPopup(asset.name); // Display asset name on marker

        // Add click event to show the asset's image when the marker is clicked
        marker.on('click', () => {
            showAssetImage(asset);

            
        });
    });
}


// Function to handle payment using Razorpay
function handlePayment() {
    const amount = document.getElementById('payment-amount').value * 100; // Amount in paise

    var options = {
        "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API key
        "amount": amount, // Amount in paise (₹500.00 = 50000 paise)
        "currency": "INR",
        "name": "Jal Jeevan Mission",
        "description": "Water Bill Payment",
        "image": "https://example.com/your_logo.png", // Optional: Add your logo
        "handler": function (response) {
            alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": "Abhinav",
            "email": "abhinav@gmail.com",
            "contact": "9999993333"
        },
        "notes": {
            "address": "Jal Jeevan Mission Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadFinanceSummary(); // Load financial summary on page load

    // Handle transaction form submission
    document.getElementById('transaction-form').addEventListener('submit', handleTransactionFormSubmit);

    // Handle payment button click
    document.getElementById('pay-button').addEventListener('click', handlePayment);
});




