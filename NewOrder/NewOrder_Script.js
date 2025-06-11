import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

document.getElementById('create_order_btn').addEventListener('click', () => {
    const serial_no = document.getElementById("serial_no").value.trim();
    const gate_pass = document.getElementById("gate_pass").value.trim();
    const capacity = document.getElementById("capacity").value.trim();
    const status = document.getElementById("status").value.trim();
    const oil_level = document.getElementById("oil_level").value.trim();
    const date_received = document.getElementById("date_received").value.trim();
    const faults = document.getElementById("faults").value.trim();
    if(!serial_no || !gate_pass || !capacity || !status || !oil_level || !date_received){
        alert("Fileds cannot be empty!!!");
        return;
    }
    if(!document.getElementById("TaC").checked){
        alert("You have not agreed to the terms and conditions! Try again");
        return;
    }
    VerifiedAndCreateOrder();
});

async function VerifiedAndCreateOrder(){
    const serial_no = document.getElementById("serial_no").value.trim();
    const gate_pass = document.getElementById("gate_pass").value.trim();
    const capacity = document.getElementById("capacity").value.trim();
    const status = document.getElementById("status").value.trim();
    const oil_level = document.getElementById("oil_level").value.trim();
    const date_received = document.getElementById("date_received").value.trim();
    const faults = document.getElementById("faults").value.trim();
    const created_by = sessionStorage.getItem("userEmail");
    const winding_type = document.getElementById("winding_type").value.trim();
    //Alerting that the function is working
    alert("This function is working!!");

    try {
        const docRef = await addDoc(collection(db,"transformers"), {
            serial_no,
            gate_pass,
            capacity,
            status,
            oil_level,
            date_received,
            faults,
            winding_type,
            created_by
        });
        alert("Order created with ID : " + docRef.id);

        const timelineRef = collection(db, "transformers",docRef.id, "timeline");

        await addDoc(timelineRef, {
            event: "Order Created",
            timestamp: new Date().toISOString(),
            updated_by: created_by
        });

        alert("Time line created with id : " + timelineRef.id);
    } catch (error) {
        console.error("Error : ",error);
        alert("Failed to create the order : ", error.message);
    }
}