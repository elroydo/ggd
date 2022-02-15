import React from 'react'
import "./footer.css"
import "./confetti.css"

const Footer = () => {
    const confettiPop = () => {
        return (
            <div>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        );
    }

    return (
        <footer className="footer">
            <div className="footer-objectives">
                <div className="objective objective-one lid"><div className="eye">Be<br />aware.</div></div>
                <div className="objective objective-two distort">Be<br />informed.</div>
                <div className="objective objective-three wiggle">Be<br />enabled.</div>
            </div>
            <div className="footer-ack">
                <p className="footer-ack-brand">Going Green Digital</p>
                <p className="confetti"><span>Marcos</span>{confettiPop()}</p>
                <p className="confetti"><span>Keeley</span>{confettiPop()}</p>
                <p className="confetti"><span>Roz</span>{confettiPop()}</p>
                <p className="confetti"><span>Cyrus</span>{confettiPop()}</p>
                <p className="confetti"><span>Gan</span>{confettiPop()}</p>
                <p className="confetti"><span>Rishi</span>{confettiPop()}</p>
                <p className="confetti"><span>Abdulaziz</span>{confettiPop()}</p>
                <p className="confetti"><span>Elroy</span>{confettiPop()}</p>
                <p className="confetti"><span>Nayna</span>{confettiPop()}</p>
            </div>
            <h5>&#169; Copyright Going Green Digital 2021</h5>
        </footer>
    )
}

export default Footer
