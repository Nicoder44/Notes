document.addEventListener("DOMContentLoaded", function () {
    const snowfallContainer = document.getElementById("snowfall-container");

    // Nombre de flocons à générer
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        // Position aléatoire sur l'axe X
        snowflake.style.left = Math.random() * 100 + "vw";

        // Position aléatoire sur l'axe Y
        snowflake.style.top = Math.random() * 100 + "vh";

        // Délai de démarrage aléatoire
        snowflake.style.animationDelay = Math.random() * 5 + "s";

        snowfallContainer.appendChild(snowflake);
    }
});
