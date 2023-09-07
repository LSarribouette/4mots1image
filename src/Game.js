import { data } from './Questions';
import { useState } from "react";


export default function Game({ isPlaying }) {
    //variables d'etat
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answeredQuestion, setAnsweredQuestion] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [goodAnswers, setGoodAnswers] = useState(0);

    //data
    const { questions } = data;
    const totalQuestions = questions.length;
    const { rightAnswer, choices } = questions[activeQuestion];

    //fonction pour la selection d'une reponse
    const onAnswerSelected = (answer) => {
        setSelectedAnswer(answer);
    }

    //fonction pour la verification de la réponse
    const onCheckAnswer = (answer) => {
        console.log(answer);
        if (answer === rightAnswer) {
            console.log("animation FIREWORKS");
            setGoodAnswers((goodAnswers) => goodAnswers + 1);
        } else {
            console.log("animation EARTHQUAKES");
        }
        console.log(goodAnswers);
        setAnsweredQuestion(true);
    }

    //fonction pour aller a la question suivante
    const onClickNext = () => {
        if (activeQuestion + 1 < totalQuestions) {
            setActiveQuestion((activeQuestion) => activeQuestion + 1);
            //on reinitialise
            setAnsweredQuestion(false);
            setSelectedAnswer('');
        } else {
            setShowResults(true);
        }
    }

    //fonction pour rejouer
    const onPlayAgain = () => {
        //on reintialise tout
        setShowResults(false);
        setGoodAnswers(0);
        setActiveQuestion(0);
        setAnsweredQuestion(false);
        setSelectedAnswer('');
    }

    if (isPlaying === false) {
        // on ne joue pas
        return null;

    } else if (isPlaying === true) {
        // on joue
        if (showResults === false) {
            return (
                <div>
                    <div className="game">
                        <div className='question-image'>
                            <span className="active-question-no">{activeQuestion + 1}</span>
                            <span className="total-question">/{totalQuestions}</span>
                            <div>{rightAnswer}</div>
                        </div>
                        <div className='answers'>
                            {choices.map((answer, index) => (
                                <button
                                    onClick={() => onAnswerSelected(answer)}
                                    key={answer}>
                                    {answer}
                                </button>
                            ))}
                        </div>
                        <div className="flex-right">
                            {!answeredQuestion ? (
                                <button onClick={() => onCheckAnswer(selectedAnswer)} disabled={selectedAnswer.length === 0}>
                                    OK
                                </button>
                            ) : (
                                <button onClick={onClickNext}>
                                    Suivant
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )
        } else if (showResults === true) {
            return (
                <div>
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
                    <div className="flex-right">
                        <button onClick={onPlayAgain}>
                            Rejouer
                        </button>
                    </div>
                </div>
            )
        }
    }
}