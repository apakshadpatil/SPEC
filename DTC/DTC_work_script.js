import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlAlIsiiUqSSNGsxinMZkHZmL1hBRBHZs",
    authDomain: "spec-5f328.firebaseapp.com",
    projectId: "spec-5f328",
    storageBucket: "spec-5f328.appspot.com",
    messagingSenderId: "53770175211",
    appId: "1:53770175211:web:9be048ccd7d190fc7434ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allOrders = [];

async function fetchOrders() {
    const querySnapShot = await getDocs(collection(db, "transformers"));
    allOrders = [];
    querySnapShot.forEach((doc) => {
        allOrders.push({
            id: doc.id,
            ...doc.data()
        });
    });
    displayOrders(allOrders);
}

function displayOrders(orders) {
    const tableBody = document.getElementById("appendable_table_body");
    tableBody.innerHTML = "";
    orders.forEach(order => {
        tableBody.innerHTML += `
            <tr>
                <td>${order.serial_no}</td>
                <td>${order.date_received}</td>
                <td>${order.id}</td>
                <td>${order.gate_pass}</td>
                <td>${order.capacity}</td>
                <td>${order.oil_level}</td>
                <td>${order.winding_type || "N/A"}</td>
                <td>${order.faults}</td>
                <td>${order.created_by}</td>
                <td>${order.status}</td>
                <td>
                    <button class="option_buttons" id="timeline_button" onclick="showTimeline('${order.id}')">&#128336;View Timeline</button>
                    <button class="option_buttons" id="edit_button" onclick="EditDetails('${order.id}')">&#9998;Edit Deatils</button>
                    <button class="option_buttons" id="completed_button" onclick="markAsCompleted('${order.id}')">Mark as Completed</button>
                    <button class="option_buttons" id="Delete_button" onclick="delete_order('${order.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function showTimeline(orderid) {
    const timelineRef = collection(db,"transformers",orderid,"timeline");
    const timelineSnap = await getDocs(timelineRef);
    document.getElementById("timeline_display_box").innerHTML = "";
    let timelineText = `Timeline for orderID : ${orderid}\n\n`;

    timelineSnap.forEach(doc => {
        const data = doc.data();
        document.getElementById("timeline_display_box").innerHTML += `
            <ul>
                <li id="timestamp"><h3>${data.timestamp}</h3></li>
                <ul>
                    <li class="timeline_data" id="event">Event :" ${data.event} "</li>
                    <li class="timeline_data" id="updated_by">updated by : ${data.updated_by}</li>
                </ul>
            </ul>
        `;
    });
    document.getElementById("timeline_display_box").innerHTML += `<button id="update_timeline" onclick="update_status('${orderid}')">&#9998; Update Status</button>`;
}
async function update_status(orderid) {
    const timelineRefer = collection(db, "transformers", orderid, "timeline");
    let update_data = prompt("Enter the update :");
    await addDoc(timelineRefer, {
        event: update_data,
        timestamp: new Date().toISOString(),
        updated_by: sessionStorage.getItem("userEmail")
    });
    showTimeline(orderid);
    alert("Timeline updated : " + orderid);
}
async function EditDetails(orderid) {
    alert("this is working");
}
async function markAsCompleted(orderid) {
    alert("mark as completed function is working");
}
async function delete_order(orderid) {
    alert("delete order function is working");
}
window.update_status=update_status;
window.EditDetails=EditDetails;
window.markAsCompleted=markAsCompleted;
window.delete_order=delete_order;
window.showTimeline=showTimeline;
fetchOrders();