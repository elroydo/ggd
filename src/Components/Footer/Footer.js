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
            <div className="footer-top footer-element">
                <div className="footer-objectives">
                    <ul className="footer-ul">
                        <li className="objective objective-one lid"> <div className="eye">Be<br />aware.</div></li>
                        <li className="objective objective-two">Be<br />informed.</li>
                        <li className="objective objective-three wiggle">Be<br />enabled.</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom footer-element">
                <ul className="footer-ul">
                    <li className="footer-list" style={{ fontSize: 20, marginRight: 30 }}>Going Green Digital</li>
                    <li className="footer-list confetti"><span>Marcos</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Keeley</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Roz</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Cyrus</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Gan</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Rishi</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Abdulaziz</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Elroy</span>{confettiPop()}</li>
                    <li className="footer-list confetti"><span>Nayna</span>{confettiPop()}</li>
                </ul>
                <h5 style={{ padding: 10 }}>Copyright Going Green Digital 2021</h5>
            </div>
        </footer>
    )
}

export default Footer
