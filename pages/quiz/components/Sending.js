import React, {useEffect, useState} from 'react';
import clsx from 'clsx'

const Sending = ({answers, onSetStep, sliderValue}) => {


    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [nameError, setNameError] = useState('Имя не может быть пустым')

    const [surname, setSurname] = useState('')

    const [email, setEmail] = useState('')
    //const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState('')//Емеил не может быть пустым

    const [phone, setPhone] = useState('')
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [phoneError, setPhoneError] = useState('Номер телефона не может быть пустым')

    //const [customerData, setCustomerData] = useState([])

    const [communication, setCommunication] = useState('')
    const [communicationDirty, setCommunicationDirty] = useState(false)
    const [communicationError, setCommunicationError] = useState('Пожалуйста, выберите один вариант');

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (nameError || emailError || phoneError || communicationError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, phoneError, communicationError])


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            // case 'email':
            //     setEmailDirty(true)
            //     break
            case 'phone':
                setPhoneDirty(true)
                break
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2) {
            setNameError('Имя не может быть короче 2 букв')
        } else if (e.target.value.length > 20) {
            setNameError('Имя не может быть длинее 20 букв')
        } else if (!e.target.value) {
            setNameError('Имя не может быть пустым')
        } else {
            setNameError('')
        }
    }

    const surnameHandler = (e) => {
        setSurname(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        if (e.target.value.length === 0) {
            setEmailError('')

        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(e.target.value).toLowerCase())) {
                setEmailError('Некорректный емейл')
            } else {
                setEmailError('')
            }
        }
    }
//TODO: react-input-mask
    const phoneHandler = (e) => {
        setPhone(e.target.value)
        if (!e.target.value) {
            setPhoneError('Номер телефона не может быть пустым')
        } else {
            setPhoneError('')
        }
    }

    const changeCommunicationHandler = (e) => {
        setCommunication(e.target.value);
        if (!e.target.value) {
            setCommunicationError('Пожалуйста, выберите один вариант')
        } else {
            setCommunicationError('')
        }
    }

    const sendClickHandler = async () => {
        setNameDirty(true)
        //setEmailDirty(true)
        setPhoneDirty(true)
        setCommunicationDirty(true)
        if (formValid) {
            // TODO: show loader
            // await handleSubmit()
            handleSubmit()
            onSetStep(5);
        }
    }

    // function changeHandler(index, e) {
    //     setCustomerData([...customerData.slice(0, index), e.target.value, ...customerData.slice(index + 1)]);
    // }

    const handleSubmit = async () => {
        console.log('Sending')

        let data = {
            name,
            email,
            surname,
            phone,
            communication,
            answers,
            sliderValue
        }

        await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
            }
        })
    }

//TODO: маска для телефона http://sanniassin.github.io/react-input-mask/demo.html
    return (
        <div className="card has-text-light is-size-4">
            <div className="card-content">
                <div className="content is-medium">
                    <h2 className="mb-5 title is-2 has-text-light">Заполните данные для отправки</h2>
                    <div className="control">
                        {(nameDirty && nameError) && <div className="has-text-danger">{nameError}</div>}
                        <input
                            value={name}
                            onBlur={e => blurHandler(e)}
                            className={clsx("input", "is-rounded", "input-end", {'is-danger': nameDirty && nameError})}
                            name='name'
                            type='text'
                            onChange={e => nameHandler(e)}
                            placeholder='Введите имя....'
                        />
                    </div>
                    <div className="control">
                        <input
                            value={surname}
                            className="input is-rounded input-end"
                            name='surname'
                            type='text'
                            onChange={e => surnameHandler(e)}
                            placeholder='Введите фамилию (не обязательно)....'
                        />
                    </div>
                    <div className="control">
                        {(/*emailDirty &&*/ emailError) && <div className="has-text-danger">{emailError}</div>}
                        <input
                            value={email}
                            onBlur={e => blurHandler(e)}
                            className="input is-rounded input-end"
                            name="email"
                            type="email"
                            onChange={e => emailHandler(e)}
                            placeholder="Введите почту (не обязательно)...."
                        />
                    </div>
                    <div className="control">
                        {(phoneDirty && phoneError) && <div className="has-text-danger">{phoneError}</div>}
                        <input
                            value={phone}
                            onBlur={e => blurHandler(e)}
                            className="input is-rounded input-end"
                            name='phone'
                            type='tel'
                            onChange={e => phoneHandler(e)}
                            placeholder='Введите номер телефона....'/>
                    </div>
                    {/* http://sanniassin.github.io/react-input-mask/demo.html */}
                    <div className="control">
                        <p className="is-size-4 mb-0">Как свами лучше связаться?</p>
                        {(communicationDirty && communicationError) &&
                        <div className="has-text-danger">{communicationError}</div>}
                        <label className="radio">
                            <input type="radio" name="foobar" value='Mail' onChange={changeCommunicationHandler}/>По
                            почте
                        </label>
                        <label className="radio">
                            <input type="radio" name="foobar" value='Phone' onChange={changeCommunicationHandler}/>По
                            телефону
                        </label>
                        <label className="radio">
                            <input type="radio" name="foobar" value='WhatsApp' onChange={changeCommunicationHandler}/>По
                            WhatsApp
                        </label>
                    </div>
                    <button
                        className="glow-on-hover is-size-5"
                        type="submit"
                        onClick={() => sendClickHandler()}
                    >Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sending;