console.log("Hello World!");

console.log("Hello World!");

// Wait for the page to fully load
window.addEventListener("load", () => {
    // Get the canvas element and the drawing context
    const canvas = document.getElementById("whiteboard");
    const context = canvas.getContext("2d");

    // Set canvas size to fill the entire page
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Set up initial properties
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set the stroke style and line properties
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 2;

    // Event listeners for drawing actions
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    console.log("Drawing Status", isDrawing);

    // Start Drawing
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Draw on the canvas
    function draw(e) {
        if (!isDrawing) return;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Stop Drawing
    function stopDrawing() {
        isDrawing = false;
    }

    // Clear the canvas
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        saveState.innerText = ""
    }

    // Save the canvas data to localStorage
    function saveCanvas() {
        const imageData = canvas.toDataURL();
        localStorage.setItem("whiteboardData", imageData);

        saveState.innerText = "Saved!"
    }

    // Clear and Save buttons
    const clearButton = document.getElementById('clear-button')
    const saveButton = document.getElementById('save-button')
    const saveState = document.getElementById('save-state')

    // Add click event listners to the buttons
    clearButton.addEventListener('click', clearCanvas)
    saveButton.addEventListener('click', saveCanvas)

    // Load the canvas data from localStorage
    function loadCanvas() {
        const savedImageData = localStorage.getItem("whiteboardData");
        if (savedImageData) {
            const img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0);
            };
            img.src = savedImageData;
        }
    }

    // Load saved canvas data when the page loads
    loadCanvas();
});
