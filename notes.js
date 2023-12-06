document.addEventListener("DOMContentLoaded", function () {
    // Charger les notes existantes depuis le localStorage
    loadNotes();
});

function addNote() {
    // Récupérer le texte de la note depuis le textarea
    var noteText = document.getElementById("noteInput").value;

    if (noteText.trim() !== "") {
        // Créer un élément li pour la nouvelle note
        var noteElement = document.createElement("li");
        noteElement.textContent = noteText;

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
        // Parcourir le tableau et créer un élément li pour chaque note
        for (var i = 0; i < notesArray.length; i++) {
            var noteElement = document.createElement("li");
            noteElement.textContent = notesArray[i];

            // Ajouter la note à la liste
            document.getElementById("notesList").appendChild(noteElement);
        }
    }
}
