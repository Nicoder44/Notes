document.addEventListener("DOMContentLoaded", function () {
    document.body.style.paddingTop = (window.innerHeight / 11) + 'px';
    const snowfallContainer = document.getElementById("snowfall-container");

    // Nombre de flocons à générer
    const numberOfSnowflakes = 150;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        // Position aléatoire sur l'axe X
        snowflake.style.left = Math.random() * 100 + "vw";

        // Position aléatoire sur l'axe Y
        snowflake.style.top = Math.random() * 100 + "vh";

        // Délai de démarrage aléatoire
        snowflake.style.animationDelay = Math.random() * 2.5 + "s";

        snowfallContainer.appendChild(snowflake);
    }
});

window.addEventListener('resize', function() {
    document.body.style.paddingTop = (window.innerHeight / 11) + 'px'; // Ajustez la valeur selon vos besoins
});
