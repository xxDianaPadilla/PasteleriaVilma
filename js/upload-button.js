const fileInput = document.getElementById("file");
const image = document.getElementById("image");

fileInput.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});