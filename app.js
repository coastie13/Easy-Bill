// Elements from HTML
const categoryDropdown = document.getElementById('category');
const lineItemDropdown = document.getElementById('lineitem');
const caseNotesInput = document.getElementById('caseNotes');
const totalPriceElement = document.getElementById('totalPrice');
const generateInvoiceButton = document.getElementById('generateInvoice');

// Data for line items
const lineItems = {
    core: [
        { name: 'Self-Care', price: 50 },
        { name: 'Household Tasks', price: 30 }
    ],
    capacity: [
        { name: 'Skill Building', price: 100 },
        { name: 'Support Coordination', price: 120 }
    ]
};

// Update line items when the category is changed
categoryDropdown.addEventListener('change', function () {
    const category = categoryDropdown.value;
    const items = lineItems[category] || [];
    lineItemDropdown.innerHTML = items.map(item => 
        `<option value="${item.price}">${item.name}</option>`
    ).join('');
    updateTotalPrice();
});

// Update the total price when the line item is changed
lineItemDropdown.addEventListener('change', updateTotalPrice);

// Update total price display
function updateTotalPrice() {
    const price = parseFloat(lineItemDropdown.value) || 0;
    totalPriceElement.innerText = `$${price}`;
}

// Generate invoice (PDF) when button is clicked
generateInvoiceButton.addEventListener('click', function () {
    const caseNotes = caseNotesInput.value;
    const selectedLineItem = lineItemDropdown.options[lineItemDropdown.selectedIndex].text;
    const selectedPrice = lineItemDropdown.value;
    
    const invoiceContent = `
        <h1>Invoice</h1>
        <p>Line Item: ${selectedLineItem}</p>
        <p>Price: $${selectedPrice}</p>
        <p>Case Notes: ${caseNotes}</p>
    `;
    
    const doc = new jsPDF();
    doc.html(invoiceContent, {
        callback: function (doc) {
            doc.save('invoice.pdf');
        }
    });
});

// Initialize category and line item
categoryDropdown.dispatchEvent(new Event('change'));
