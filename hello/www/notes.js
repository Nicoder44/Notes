const body = document.body;
const container = document.container;

if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {

        // Met à jour la barre de batterie initiale
        updateBatteryUI(battery);

        // Écoute les événements de mise à jour de l'état de la batterie
        battery.addEventListener('chargingchange', function() {
            updateBatteryUI(battery);
        });

        battery.addEventListener('levelchange', function() {
            updateBatteryUI(battery);
        });
    });
} else {
  console.log("L'API Battery Status n'est pas prise en charge sur ce navigateur.");
}

function updateBatteryUI(battery) {
    var batteryBar = document.getElementById('battery-bar');
    var batteryLevelText = document.getElementById('battery-level-text');

    if (batteryBar) {
        var batteryLevel = battery.level * 10;
        console.log(batteryBar);
        batteryBar.style.width = batteryLevel + '%';
        batteryLevelText.textContent = batteryLevel * 10 + '%';

        // Tu peux également ajouter une classe CSS pour changer la couleur de la barre en fonction du niveau de la batterie
        if (batteryLevel <= 20) {
            batteryBar.classList.add('low-battery');
        } else {
            batteryBar.classList.remove('low-battery');
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.paddingTop = (window.innerHeight / 11) + 'px';
    // Charger les notes existantes depuis le localStorage
    loadNotes();

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        container.classList.toggle('dark-mode');
        
        // Sauvegarder l'état du mode sombre dans le localStorage
        saveDarkModeState(body.classList.contains('dark-mode'));
    });

    if (getDarkModeState()) {
        body.classList.add('dark-mode');
    }
});

function addNote() {
    // Récupérer le texte de la note depuis le textarea
    var noteText = document.getElementById("noteInput").value;

    if (noteText.trim() !== "") {
        // Créer un élément li pour la nouvelle note
        var noteElement = document.createElement("li");
        noteElement.textContent = noteText;

        noteElement.classList.add('note-item');

        var editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit edit-icon";
        editIcon.addEventListener("click", function () {
            editNote(this.parentElement);
        });

        var deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash delete-icon";
            deleteIcon.setAttribute("title", "Supprimer la note");
            deleteIcon.addEventListener("click", function () {
                deleteNote(this.parentElement);
            });

        noteElement.appendChild(editIcon);
        noteElement.appendChild(deleteIcon);

        // Ajouter la nouvelle note à la liste
        document.getElementById("notesList").appendChild(noteElement);

        // Sauvegarder les notes dans le localStorage
        saveNotes();

        // Effacer le contenu du textarea
        document.getElementById("noteInput").value = "";
    }
    else{
        console.log("It didn't worked...")
    }
}

function editNote(noteElement) {
    // Ajouter ici la logique pour éditer la note
    // Par exemple, tu pourrais ouvrir une boîte de dialogue modale
    var updatedText = prompt("Modifier la note :", noteElement.textContent);

    if (updatedText !== null) {
        // Créer à nouveau l'élément de texte pour la note
        noteElement.textContent = updatedText;

        noteElement.classList.add('note-item');

        // Ajouter des icônes pour éditer et supprimer
        var editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit edit-icon";
        editIcon.setAttribute("title", "Éditer la note");
        editIcon.addEventListener("click", function () {
            editNote(noteElement);
        });

        var deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash delete-icon";
        deleteIcon.setAttribute("title", "Supprimer la note");
        deleteIcon.addEventListener("click", function () {
            deleteNote(noteElement);
        });

        // Ajouter les icônes à la note
        noteElement.appendChild(editIcon);
        noteElement.appendChild(deleteIcon);

        // Ajouter à nouveau la note à la liste parente
        parentList.appendChild(noteElement);

        // Sauvegarder les notes mises à jour
        saveNotes();
    }
}

function deleteNote(noteElement) {
    // Ajouter ici la logique pour supprimer la note
    // Par exemple, tu pourrais demander une confirmation à l'utilisateur
    if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
        noteElement.remove();
        saveNotes();
    }
}

function saveDarkModeState(isDarkMode) {
    // Sauvegarder l'état du mode sombre dans le localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}

function getDarkModeState() {
    // Récupérer l'état du mode sombre depuis le localStorage
    return JSON.parse(localStorage.getItem("darkMode")) || false;
}

function saveNotes() {
    // Récupérer toutes les notes présentes dans la liste
    var notes = document.getElementById("notesList").getElementsByTagName("li");

    // Créer un tableau pour stocker le texte de chaque note
    var notesArray = [];

    // Parcourir chaque note et ajouter son texte au tableau
    for (var i = 0; i < notes.length; i++) {
        notesArray.push(notes[i].textContent);
    }

    // Convertir le tableau en chaîne JSON et sauvegarder dans le localStorage
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

function loadNotes() {
    // Récupérer les notes depuis le localStorage
    var notesArray = JSON.parse(localStorage.getItem("notes"));

    // Vérifier s'il y a des notes à charger
    if (notesArray) {
        // Réinitialiser le contenu de la liste
        document.getElementById("notesList").innerHTML = "";

        // Parcourir le tableau et créer un élément li pour chaque note
        for (var i = 0; i < notesArray.length; i++) {
            var noteElement = document.createElement("li");
            noteElement.textContent = notesArray[i];

            noteElement.classList.add('note-item');

            // Ajouter des icônes pour éditer et supprimer
            var editIcon = document.createElement("i");
            editIcon.className = "fas fa-edit edit-icon";
            editIcon.setAttribute("title", "Éditer la note");
            editIcon.addEventListener("click", function () {
                editNote(this.parentElement);
            });

            var deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash delete-icon";
            deleteIcon.setAttribute("title", "Supprimer la note");
            deleteIcon.addEventListener("click", function () {
                deleteNote(this.parentElement);
            });

            // Ajouter les icônes à la note
            noteElement.appendChild(editIcon);
            noteElement.appendChild(deleteIcon);

            // Ajouter la note à la liste
            document.getElementById("notesList").appendChild(noteElement);
        }
    }
}

