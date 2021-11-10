import React, {useState} from 'react';
import Start from './components/Start';
import Question from './components/Question';
import Sending from "./components/Sending";
import questions from './data/questions.json'
import Slider from "./components/Slider";
import End from "./components/End";
import Header from "./layouts/Header";
import Head from "next/head";
import Image from 'next/image';
import profilePic from '/assets/images/S_zhyoltymi_okoshkami.png';


const App = () => {

    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [sliderValue, setSliderValue] = useState(6000000)


    const quizStartHandler = () => {
        setStep(2);
    }

    const quizStartAgainHandler = () => {
        setAnswers([])
        setStep(1);
        setActiveQuestion(0);
    }

    //TODO: настроить head meta
    return (
        <>
            <Head>
                <title>Friendly Realtor Moscow</title>
                <link rel="shortcut icon" href="/assets/images/FRM.ico" />
            </Head>
            <Header/>
            <div className='App'>
                {step === 1 && <Start onQuizStart={quizStartHandler}/>}
                {step === 2 && <Question
                    data={questions.data[activeQuestion]}
                    onAnswerUpdate={setAnswers}
                    numberOfQuestion={questions.data.length}
                    activeQuestion={activeQuestion}
                    onSetActiveQuestion={setActiveQuestion}
                    onSetStep={setStep}
                />}
                {step === 3 && <Slider
                    setSliderValue={setSliderValue}
                    onSetStep={setStep}
                />}
                {step === 4 && <Sending
                    answers={answers}
                    onSetStep={setStep}
                    sliderValue={sliderValue}
                />}
                {step === 5 && <End
                    quizStartAgain={quizStartAgainHandler}
                />}
            </div>
        </>
    );
}

export default App;
