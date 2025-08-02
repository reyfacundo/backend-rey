const socket = io();

socket.emit("test message", { message: "Saludos desde el cliente" });

socket.on("welcome", (data) => {
    console.log(data);
});

const form = document.getElementById("realTimeForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
        const response = await fetch("/api/products", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            console.log("Product added successfully");
            form.reset();
        } else {
            const errorData = await response.json();
            console.log("Error adding product: " + errorData.error);
        }
    } catch (err) {
        console.error(err);
    }
});

socket.on("product", (data) => {
    const container = document.querySelector(".product-container");
    const li = document.createElement("li");
    li.classList.add("product-card");
    
    const titleElement = document.createElement("h3");
    titleElement.textContent = data.title;
    
    const descriptionElement = document.createElement("h3");
    descriptionElement.textContent = data.description;

    li.appendChild(titleElement);
    li.appendChild(descriptionElement);

    container.appendChild(li);
});
