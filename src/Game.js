import { data } from './Questions';
import { useState } from "react";


export default function Game({ isPlaying }) {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answeredQuestion, setAnsweredQuestion] = useState(false);
    const [activeAnswer, setActiveAnswer] = useState('');
    const [coloredAnswer, setColoredAnswer] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [goodAnswers, setGoodAnswers] = useState(0);

    //data
    const { questions } = data;
    const totalQuestions = questions.length;
    const { rightAnswer, url, choices } = questions[activeQuestion];

    //fonction pour la selection d'une reponse
    const onAnswerSelected = (answer) => {
        setSelectedAnswer(answer);
    }

    //fonction pour la verification de la réponse
    const onCheckAnswer = (answer) => {
        setActiveAnswer(answer);
        if (answer === rightAnswer) {
            console.log("animation FIREWORKS");
            setGoodAnswers((goodAnswers) => goodAnswers + 1);
            setColoredAnswer('green-button');
        } else {
            console.log("animation EARTHQUAKES");
            setColoredAnswer('red-button');
        }
        setAnsweredQuestion(true);
    }

    //fonction pour aller a la question suivante
    const onClickNext = () => {
        if (activeQuestion + 1 < totalQuestions) {
            setActiveQuestion((activeQuestion) => activeQuestion + 1);
            //on reinitialise
            setAnsweredQuestion(false);
            setSelectedAnswer('');
            setActiveAnswer('');
        } else {
            setShowResults(true);
        }
    }

    //fonction pour rejouer
    const onPlayAgain = () => {
        reinitializeAll();
    }

    //fonction pour reinitialiser les variables d'etat
    const reinitializeAll = () => {
        setShowResults(false);
        setGoodAnswers(0);
        setActiveQuestion(0);
        setAnsweredQuestion(false);
        setSelectedAnswer('');
        setActiveAnswer('');
    }

    // on ne joue pas
    if (!isPlaying) {
        return null;
    }

    // on joue
    if (!showResults) {
        return (
            <div>
                <div className="game">
                    <div className='question-image'>
                        <div>
                            <span className="active-question-no">{activeQuestion + 1}</span>
                            <span className="total-question">/{totalQuestions}</span>
                        </div>
                        <img src={url}></img>
                    </div>
                    <div className='answers'>
                        {choices.map((answer, index) => (
                            <button
                                className={`answer ${answer == activeAnswer ? coloredAnswer : 'warning'}`}
                                onClick={() => onAnswerSelected(answer)}
                                disabled={answeredQuestion}
                                key={answer}>
                                {answer}
                            </button>
                        ))}
                        {!answeredQuestion ? (
                            <button className="ok-next" onClick={() => onCheckAnswer(selectedAnswer)} disabled={selectedAnswer.length === 0}>
                                OK
                            </button>
                        ) : (
                            <button className="ok-next" onClick={onClickNext}>
                                Suivant
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    //on montre les resultats
    return (
        <div className='results'>
            {goodAnswers > 0 ? (
                <div>
                    <h2>Bien joué !</h2>
                    <p>Tu as eu {goodAnswers} {goodAnswers <= 1 ? 'bonne réponse' : 'bonnes réponses'} sur {totalQuestions} questions.</p>
                </div>
            ) : (
                <div>
                    <h2>Dommage !</h2>
                    <p>Tu n'as eu aucune bonne réponse sur {totalQuestions} questions.</p>
                </div>
            )}
            <button onClick={onPlayAgain}>
                Rejouer
            </button>
        </div>
    )
}