document.addEventListener('DOMContentLoaded', function() {
    // --- VARIABLES ---
    let paused = false;
    let counter = 0;
    let delai = 1000;
    // --- COMPOSANTS ---
    const servicesSection = document.getElementById('services_section');
    const timers = Array.from(document.getElementsByClassName('timer'));
    const pauseBtn = document.getElementsByClassName('pauseBtn');
    const updateButton = document.getElementById('updateButton');
    const services = Array.from(document.getElementsByClassName('service'));

    // --- FONCTIONS ---
    // Fonction qui permet de connaitre quel timer est visé
    function getIndTimer() {
        return (counter % timers.length);
    }

    function nextTimer() {
        setPaused(getIndTimer()); // Mise en pause de l'animation terminée

        previousService(getIndTimer());

        counter += 1; // Incrémentation du compteur
        
        if (getIndTimer() == 0) { // Si la dernière animation est finie...
            setTimeout(() => {
                timers.forEach(element => {
                    element.classList.add('restart');
                    element.offsetHeight;
                    element.classList.remove('restart');
                });
            }, delai);
        }

        setTimeout(() => {
            nextService(getIndTimer());
        }, (delai/2));

        timers[getIndTimer()].addEventListener('animationend', nextTimer);

        setTimeout(() => { // Délai avant réalisation
            checkVisibility(); // Vérification de la position de la section
        }, (delai/2));
    }

    function previousService(indice) {
        services[indice].classList.remove('visible');
        services[indice].classList.add('restart');
        services[indice].offsetHeight;
        setTimeout(() => {
            services[indice].style.display = 'none';
            services[indice].classList.remove('restart');
            services[indice].offsetHeight;
        }, (delai/2));
    }

    function nextService(indice) {
        services[indice].style.display = 'grid';
        services[indice].offsetHeight;
        services[indice].classList.add('visible');
    }

    // Fonction qui ajoute la classe CSS 'paused' selon le paramètre
    function setPaused(i) {
        timers[i].classList.add('paused');
    }

    // Fonction qui supprime la classe CSS 'paused' selon le paramètre
    function setPlay(i) {
        timers[i].classList.remove('paused');
    }

    // Fonction pour vérifier si l'élément est visible dans le viewport
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top < (window.innerHeight * 0.5) &&
            rect.top > (-1 * window.innerHeight * 0.5)
        );
    }

    // Fonction qui démarre l'animation si la section est visible
    function checkVisibility() {
        if (!paused) {
            if (isElementInViewport(servicesSection)) {
                setPlay(getIndTimer());
            } else {
                setPaused(getIndTimer());
            }
        }
    }

    // Fonstion qui continue ou stop l'animation
    function updateAnimation() {
        if (paused) { // Si le bouton est sur pause
            paused = false; // Passe le bouton sur play
            pauseBtn[1].style.display = 'none';// *
            pauseBtn[0].style.display = 'initial';// *
            checkVisibility(); // Vérifie si l'élément est à l'écran pour continuer l'animation
        } else { // Sinon le bouton est sur play
            paused = true; // Passe le bouton sur pause
            pauseBtn[0].style.display = 'none'; // *
            pauseBtn[1].style.display = 'initial'; // *
            setPaused(getIndTimer()); // L'animation s'arrête
        }
    }

    nextService(getIndTimer());

    // Passe au prochain timer lorsque l'animation est terminée
    timers[0].addEventListener('animationend', nextTimer);

    // Ajoute un écouteur sur l'événement scroll
    window.addEventListener('scroll', checkVisibility);

    // Vérification au chargement de la page
    checkVisibility();

    updateButton.addEventListener('click', updateAnimation);
});