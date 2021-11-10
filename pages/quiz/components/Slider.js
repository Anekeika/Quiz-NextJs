import React, {useState} from 'react'

const formatter = new Intl.NumberFormat()

const Slider = ({onSetStep, setSliderValue}) => {

    const [value, setValue] = useState(6000000)
    const [valueView, setValueView] = useState(formatter.format(value))

    const valueHandler = (e) => {
        const newValue =  e.target.value
        setValue(newValue)
        setValueView(formatter.format(newValue))
    }

    const nextClickHandler = (e) => {
        {
            setSliderValue(value)
            onSetStep(4);
        }
    }


    return (
        <div className="card has-text-light is-size-4">
            <div className="card-content">
                <div className="content">
                    <h2 className="card-header-title has-text-light">Укажите примерную стоимость:</h2>
                    <div className="control">
                        <input
                            value={valueView}
                            className="slider-input input is-rounded"
                            name='cost'
                            // type='number'
                            // min="6000000"
                            // max="50000000"
                            // step="100000"
                            onChange={e => valueHandler(e)}
                            placeholder={valueView}
                        />
                    </div>
                    <div>
                        <input
                            className="slider mt-4"
                            type="range"
                            min="6000000"
                            max="50000000"
                            step="100000"
                            onChange={e => valueHandler(e)}
                            value={value}
                        />
                    </div>
                </div>
                <button
                    className="glow-on-hover is-size-5"
                    type="button"
                    onClick={nextClickHandler}
                >
                    Далее
                </button>
            </div>
        </div>
    )
}

export default Slider;