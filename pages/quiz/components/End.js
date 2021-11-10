import React from 'react';

const End = ({quizStartAgain}) => {
    return (
        <div className="card has-text-light is-size-4">
            <div className="card-content">
                <div className="content">
                    <h1 className="is-2 has-text-light">Спасибо что прошли наш опрос!</h1>
                    <p className="is-size-4">В ближайшее время с вами свяжется наш менеджер.</p>
                    <button className="glow-on-hover is-size-5" type="button" onClick={quizStartAgain}>Пройти заново</button>
                </div>
            </div>
        </div>
    )
}

export default End;