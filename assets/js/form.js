document.addEventListener('DOMContentLoaded', function() {

    // Sélectionner tous les inputs et textarea dans des .input_container
    const inputs = document.querySelectorAll('.input_container input, .input_container textarea');

    // Fonction pour vérifier si le champ est vide ou non
    function checkInputValue(event) {
        const input = event.target;
        const parent = input.closest('.input_container');  // Sélectionner le conteneur parent

        // Si l'input contient du texte, ajouter la classe 'not-empty'
        if (input.value.trim() !== '') {
            parent.classList.add('not-empty');
        } else {
            parent.classList.remove('not-empty');
        }
    }

    // Vérifier initialement si les champs ont une valeur au chargement de la page
    inputs.forEach(input => {
        // Ajouter ou retirer la classe en fonction de la valeur au chargement
        if (input.value.trim() !== '') {
            input.closest('.input_container').classList.add('not-empty');
        }
        // Ajouter des écouteurs d'événements à chaque champ
        input.addEventListener('input', checkInputValue);  // Lorsqu'on tape
        input.addEventListener('blur', checkInputValue);   // Lorsqu'on quitte le champ
    });

});