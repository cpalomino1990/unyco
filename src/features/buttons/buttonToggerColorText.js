
export function setupColorSlider() {
    const colorSlider = document.getElementById("color-slider");

    if (!colorSlider) {
        console.error("No se encontró el slider con id 'color-slider'.");
        return;
    }

    // Configura el evento para cambiar el color dinámicamente
    colorSlider.addEventListener("input", (event) => {
        const colorValue = event.target.value;
        document.body.style.backgroundColor = `hsl(${colorValue}, 100%, 50%)`;
        localStorage.setItem("pageColor", colorValue);
    });

    // Carga el color guardado en localStorage al cargar la página
    const savedColor = localStorage.getItem("pageColor");
    if (savedColor) {
        colorSlider.value = savedColor;
        document.body.style.backgroundColor = `hsl(${savedColor}, 100%, 50%)`;
    }
}