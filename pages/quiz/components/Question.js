import React, {useState} from 'react'
import uniq from "lodash/uniq"

const Question = ({data, onAnswerUpdate, numberOfQuestion, activeQuestion, onSetActiveQuestion, onSetStep}) => {
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState('');

    function answerToggle(choice) {
        return function (e) {
            if (e.target.checked) {
                setSelected(uniq([...selected, choice]))
            } else {
                setSelected(selected.filter(a => a !== choice))
            }
        }
    }

    const radioHandler = (e) => {
        setSelected([e.target.value])
    }

    const nextClickHandler = (e) => {
        if (selected.length === 0) {
            return setError('Пожалуйста, выберите один вариант!');
        }
        onAnswerUpdate(prevState => [...prevState, {q: data.question, a: selected}]);
        setSelected([]);
        setError('');
        if (activeQuestion < numberOfQuestion - 1) {
            onSetActiveQuestion(activeQuestion + 1);
        } else {
            onSetStep(3);
        }
    }

    return (
        <div className="card has-text-light is-size-4">
            <div className="card-content card-shadow">
                <div className="content">
                    <h2 className="card-header-title has-text-light is-size-4-touch">{data.question}</h2>

                    {data.multiAnswerQuestions ?
                        (<div className="control">
                            {data.choices.map((choice, i) => (
                                <label className="checkbox" key={i}>
                                    <input type="checkbox" name="answer" checked={selected.some(a => a === choice)}
                                           onChange={answerToggle(choice)}/>
                                    {choice}
                                </label>
                            ))}
                        </div>)
                        :
                        (<div className="control">
                            {data.choices.map((choice, i) => (
                                <label className="radio" key={i}>
                                    <input type="radio" name="answer" value={choice}
                                           checked={selected.some(a => a === choice)}
                                           onChange={radioHandler}/>
                                    {choice}
                                </label>
                            ))}
                        </div>)
                    }
                    {error && <div className="has-text-danger">{error}</div>}
                    <button className="glow-on-hover btn mt-3 is-size-5" type="button" onClick={nextClickHandler}><p>Следующий
                        вопрос</p>
                    </button>
                    <div className="mt-2 mb-0">Шаг {activeQuestion + 1} из {numberOfQuestion}</div>
                </div>
            </div>
        </div>
    )
}

export default Question;
