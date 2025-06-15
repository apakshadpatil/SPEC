function openDetails(orderId) {
  // For demo: Replace this with real data fetch later
  const panel = document.getElementById("detailPanel");
  const content = document.getElementById("orderDetailsContent");

  content.innerHTML = `
    <p><strong>Order ID:</strong> ORD00${orderId}</p>
    <p><strong>Gate Pass:</strong> GP00${orderId}</p>
    <p><strong>Status:</strong> ${orderId % 2 === 0 ? 'Pending' : 'Completed'}</p>
    <p><strong>Date:</strong> 2024-06-${10 - orderId}</p>
    <p><strong>Items:</strong> Wire x 10, Switch x 5</p>
  `;
  panel.classList.add("open");
}

function closeDetails() {
  document.getElementById("detailPanel").classList.remove("open");
}


function generateReport() {
  alert("Report generated.");
}

function editConfig() {
  alert("Edit configuration details.");
}

function markAsUndone() {
  alert("Order marked as undone.");
}

function generateBill() {
  alert("Bill generated.");
}

function generateGatePass() {
  alert("Gate Pass Bill generated.");
}
document.querySelectorAll(".order-row.clickable").forEach(row => {
  row.addEventListener("click", () => {
    const orderId = row.getAttribute("data-id");
    openDetails(orderId);
  });
});

