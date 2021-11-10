import React from 'react';

const Start = ({onQuizStart}) => {
    return (

        <div className="card has-text-light is-size-4">
            <div className="card-content card-shadow">
                <div className="content">
                    <h2 className="card-header-title has-text-light is-size-3">Выгодные предложения от застройщиков только у
                        нас!</h2>
                    <p className="">Получите подбор новостроек под Ваши критерии в кратчайшие сроки</p>
                    <button className="glow-on-hover mb-3" type="button" onClick={onQuizStart}><p
                        className="is-size-4">Начнем!</p></button>
                </div>
            </div>
        </div>
    )
}

export default Start;