import React from 'react';
import Image from 'next/image'
import logoPic from '/assets/images/F.R.M. Logo.png'
import phonePic from '/assets/images/free-icon-phone-call-black.png'

const Header = () => {
    return (
        <div className="navbar ">
            <div className="navbar-brand">
                    <Image
                        className="p-1 is-1"
                        src={logoPic}
                        alt="logo"
                        width={50}
                        height={40}
                    />
                {/*<a className="navbar-item is-1 is" href="#">*/}
                {/*</a>*/}
                <span className="is-size-5 p-2 has-text-weight-medium navbar-menu">Friendly Realtor Moscow</span>
            </div>
            <div className="header-end mr-3">
                <div className="navbar-item">
                        <Image
                            className="p-1 is-1"
                            src={phonePic}
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    <div className="content is-medium ">
                        <div className="ml-2">
                        <p> 8(123)-321-32-32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;