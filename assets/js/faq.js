document.addEventListener('DOMContentLoaded', function() {

    let questionIndice = 0;

    const questions = Array.from(document.getElementsByClassName('question'));

    function switchQuestion(indice) {
        if (indice !== questionIndice) {
            questions[questionIndice].classList.remove('active');
            questionIndice = indice;
            questions[questionIndice].classList.add('active');
        }
    }

    for (let index = 0; index < questions.length; index++) {
        questions[index].addEventListener('click', () => switchQuestion(index));
    }

});