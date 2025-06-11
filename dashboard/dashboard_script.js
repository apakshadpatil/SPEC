const buttons = document.querySelectorAll(".custom-btn");
const iframe = document.getElementById("iframe_content");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove the style from all buttons
    buttons.forEach((btn) => {
      btn.style.width = "100%";
      btn.style.fontSize = "large";
      btn.style.cursor = "pointer";
      btn.style.backgroundColor = "transparent";
      btn.style.fontFamily = "Arial, Helvetica, sans-serif";
      btn.style.border = "0px solid transparent";
      btn.style.color = "rgba(128, 128, 128, 0.641)";
      btn.style.borderRadius = "5px";
      btn.style.flexGrow = "1";
      btn.style.height = "50px";
    });

    // Add the style to the clicked button
    this.style.borderLeft = "7px solid #6250ff";
    this.style.backgroundColor = "#bfccff48";
    this.style.fontWeight = "bold";
    this.style.color = "white";
    this.style.transitionDuration = "0.2s";


    // Perform a specific action based on data-action or id
    const action = this.getAttribute("data-action");

    switch (action) {
      case "DTCwork":
        iframe.src = "/DTC/DTCwork.html";
        break;
      case "NewOrder":
        iframe.src = "/NewOrder/NewOrder.html";
        break;
      case "CompletedOrders":
        iframe.src = "/CompletedOrders/CompletedOrders.html";
        break;
      case "Material":
        iframe.src = "/Material/Material.html";
        break;
      case "Finance":
        iframe.src = "/Finance/Finance.html";
        break;
      default:
        alert("No action defined.");
    }
  });
});

