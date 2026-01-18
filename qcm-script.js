// =====================
// QCM - JAVASCRIPT
// =====================

// Réponses correctes
const correctAnswers = {
    q1: 'a',
    q2: 'b',
    q3: 'c',
    q4: 'c',
    q5: 'b',
    q6: 'a',
    q7: 'b',
    q8: 'c',
    q9: 'c',
    q10: 'b',
    q11: 'c',
    q12: 'd',
    q13: 'b',
    q14: 'b',
    q15: 'b',
    q16: 'b',
    q17: 'c',
    q18: 'b',
    q19: 'b',
    q20: 'd',
    q21: 'a',
    q22: 'b',
    q23: 'c',
    q24: 'a',
    q25: 'a',
    q26: 'b',
    q27: 'b',
    q28: 'b',
    q29: 'a',
    q30: 'b'
};

// Libellés pour les questions Vrai/Faux
const labels = {
    q26: { a: 'Vrai', b: 'Faux' },
    q27: { a: 'Vrai', b: 'Faux' },
    q28: { a: 'Vrai', b: 'Faux' },
    q29: { a: 'Vrai', b: 'Faux' },
    q30: { a: 'Vrai', b: 'Faux' }
};

// Messages d'explication
const explanations = {
    q1: '✓ Correct : Les trois sous-systèmes sont Décision, Information et Opérant.',
    q2: '✓ Correct : Un modèle représente de façon abstraite une partie du monde réel.',
    q3: '✓ Correct : MERISE comporte 3 niveaux : conceptuel, logique et physique.',
    q4: '✓ Correct : Une DF élémentaire directe n\'a pas de propriété intermédiaire.',
    q5: '✓ Correct : L\'identifiant est la combinaison des clés des entités associées.',
    q6: '✓ Correct : La 1FN exige l\'atomicité (propriétés non décomposables).',
    q7: '✓ Correct : La clé étrangère garantit l\'intégrité référentielle.',
    q8: '✓ Correct : La syntaxe SQL est "CREATE DATABASE".',
    q9: '✓ Correct : NOT NULL empêche les valeurs nulles.',
    q10: '✓ Correct : HAVING filtre les groupes après regroupement.',
    q11: '✓ Correct : La directe n\'a pas de propriété intermédiaire.',
    q12: '✓ Correct : Les triggers SQL ne font pas partie de la construction du MCD.',
    q13: '✓ Correct : Cardinalités (1,N)-(0,N) → Migration de la clé de Client vers Commande.',
    q14: '✓ Correct : Utiliser une sous-requête pour comparer avec la moyenne du département.',
    q15: '✓ Correct : L\'objectif est d\'éliminer la redondance et les anomalies.',
    q16: '✓ Correct : Une association réflexive lie une entité à elle-même.',
    q17: '✓ Correct : L\'opérateur "=" définit une jointure interne équi.',
    q18: '✓ Correct : UNIQUE permet plusieurs NULL mais des valeurs uniques.',
    q19: '✓ Correct : AVG() calcule la moyenne.',
    q20: '✓ Correct : Un livre peut avoir plusieurs auteurs, un auteur plusieurs livres.',
    q21: '✓ Correct : CodePostal → Ville est une DF élémentaire directe.',
    q22: '✓ Correct : La règle 2 applique une migration de clé.',
    q23: '✓ Correct : HAVING filtre les groupes (WHERE filtre les lignes).',
    q24: '✓ Correct : LDD (Langage de Définition de Données) pour CREATE.',
    q25: '✓ Correct : SGBD = Système de Gestion de Bases de Données.',
    q26: '✗ Faux : Un MCD ne doit contenir que des propriétés élémentaires, pas calculées.',
    q27: '✗ Faux : Une clé primaire ne peut jamais être NULL.',
    q28: '✗ Faux : WHERE filtre les lignes individuelles, HAVING filtre les groupes.',
    q29: '✓ Vrai : Une association ternaire devient une table dans le MLD.',
    q30: '✗ Faux : SQL signifie "Structured Query Language", pas "Question".'
};

// Gestion du formulaire
document.getElementById('qcmForm').addEventListener('submit', function(e) {
    e.preventDefault();
    correctQCM();
});

// Correction du QCM
function correctQCM() {
    let score = 0;
    let totalQuestions = 30;
    let results = [];

    // Parcourir toutes les questions
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = 'q' + i;
        const selected = document.querySelector(`input[name="${questionName}"]:checked`);
        const correct = correctAnswers[questionName];

        if (selected) {
            const userAnswer = selected.value;
            const isCorrect = userAnswer === correct;

            if (isCorrect) {
                score++;
            }

            // Récupérer le label de la réponse
            const label = selected.parentElement.textContent.trim();

            results.push({
                question: i,
                userAnswer: userAnswer,
                correctAnswer: correct,
                isCorrect: isCorrect,
                label: label
            });

            // Marquer visuellement la question
            const questionDiv = document.querySelector(`.question[data-question="${i}"]`);
            const feedback = questionDiv.querySelector('.feedback');

            questionDiv.classList.add('answered');
            if (!isCorrect) {
                questionDiv.classList.add('incorrect');
            }

            feedback.textContent = explanations[questionName] || 'Réponse enregistrée.';
            feedback.classList.add('show');
            feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    }

    // Afficher les résultats
    displayResults(score, totalQuestions, results);

    // Scroller vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Afficher les résultats
function displayResults(score, total, results) {
    const percentage = Math.round((score / total) * 100);
    const modal = document.getElementById('resultsModal');

    // Mettre à jour la barre de progression
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('currentQuestion').textContent = score;

    // Score et message
    document.getElementById('scoreNumber').textContent = percentage;

    const scoreMessage = getScoreMessage(percentage);
    document.getElementById('scoreText').innerHTML = scoreMessage;

    // Résultats détaillés
    let resultsList = '<h3 style="color: #667eea; margin-bottom: 1rem;">Détails des réponses :</h3>';
    let correctCount = 0;
    let incorrectCount = 0;

    results.forEach(result => {
        if (result.isCorrect) {
            correctCount++;
            resultsList += `
                <div class="result-item correct">
                    <strong>Q${result.question}: ✓ Correcte</strong>
                    Votre réponse: ${result.userAnswer.toUpperCase()}
                </div>
            `;
        } else {
            incorrectCount++;
            resultsList += `
                <div class="result-item incorrect">
                    <strong>Q${result.question}: ✗ Incorrecte</strong>
                    Votre réponse: ${result.userAnswer.toUpperCase()}<br>
                    Réponse correcte: ${result.correctAnswer.toUpperCase()}
                </div>
            `;
        }
    });

    resultsList += `
        <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f5f5f5; border-radius: 6px;">
            <p><strong>✓ Correctes :</strong> ${correctCount}/${results.length}</p>
            <p><strong>✗ Incorrectes :</strong> ${incorrectCount}/${results.length}</p>
        </div>
    `;

    document.getElementById('resultsList').innerHTML = resultsList;

    // Afficher le modal
    modal.classList.add('show');
}

// Message selon le score
function getScoreMessage(percentage) {
    if (percentage === 100) {
        return '<strong>🎉 PARFAIT !</strong><br>Vous maîtrisez complètement le sujet !';
    } else if (percentage >= 90) {
        return '<strong>🌟 EXCELLENT !</strong><br>Très bon résultat, quelques petites lacunes.';
    } else if (percentage >= 80) {
        return '<strong>👍 BON TRAVAIL !</strong><br>Vous avez bien révisé.';
    } else if (percentage >= 70) {
        return '<strong>📚 CORRECT</strong><br>Vous avez une bonne base, à renforcer.';
    } else if (percentage >= 60) {
        return '<strong>⚠️ À AMÉLIORER</strong><br>Révision recommandée.';
    } else {
        return '<strong>❌ À REFAIRE</strong><br>Veuillez revoir le cours et réessayer.';
    }
}

// Fermer le modal
function closeResults() {
    document.getElementById('resultsModal').classList.remove('show');
}

// Réinitialiser le formulaire
function resetForm() {
    // Réinitialiser les réponses
    document.getElementById('qcmForm').reset();

    // Réinitialiser l'affichage
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('answered', 'incorrect');
    });

    document.querySelectorAll('.feedback').forEach(f => {
        f.classList.remove('show', 'correct', 'incorrect');
    });

    // Réinitialiser la barre de progression
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('currentQuestion').textContent = '0';

    // Fermer le modal
    closeResults();

    // Scroller vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mettre à jour la barre de progression en temps réel
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const totalQuestions = 30;
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const percentage = (answered / totalQuestions) * 100;

        document.getElementById('progressBar').style.width = percentage + '%';
        document.getElementById('currentQuestion').textContent = answered;
    });
});

// Fermer le modal en cliquant en dehors
window.addEventListener('click', function(event) {
    const modal = document.getElementById('resultsModal');
    if (event.target === modal) {
        closeResults();
    }
});
