import React, { Component } from 'react';
//import { NavLink } from '../Components/NavBar/NavBarElements';
import { getClimateArticles, getDisasterArticles, getWaterArticles, getLandArticles } from '../Components/Article/NewsAPI';
import Auth from '../Auth';
import ArticleCard from '../Components/Article/ArticleCard';
import { BsChevronDown, BsInfoCircleFill } from "react-icons/bs";
import ClimateActionFlipCard from '../Components/Homepage/ClimateActionFlipCard.js'
import LifeBelowWaterFlipCard from '../Components/Homepage/LifeBelowWaterFlipCard.js'
import LifeOnLandFlipCard from '../Components/Homepage/LifeOnLandFlipCard.js'
import emailjs from 'emailjs-com';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const emailRegex = RegExp(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/);

const formValid = ({ ...rest }) => {
    let valid = false;

    Object.values(rest).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: Auth.isAuthenticated(),
            isScrolling: false,
            articlesClimate: [],
            articlesDisaster: [],
            articlesWater: [],
            articlesLand: [],
            newsAPIError: "",
            isFlipped: false,
            show: false,
            name: null,
            email: null,
            allValid: false,
            populated: [],
            formValidation: {
                name: "",
                email: "",
            }

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    async componentDidMount() {
        window.addEventListener("scroll", this.onScroll); //wait for scroll event
        try {
            const responseClimate = await getClimateArticles();
            const responseDisaster = await getDisasterArticles();
            const responseWater = await getWaterArticles();
            const responseLand = await getLandArticles();
            //set responses to states
            this.setState({
                articlesClimate: responseClimate.articles,
                articlesDisaster: responseDisaster.articles,
                articlesWater: responseWater.articles,
                articlesLand: responseLand.articles,
            });
        } catch (error) {
            this.setState({ newsAPIError: error });
        }
    }

    componentWillMount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = () => {
        this.setState({ isScrolling: true }); //upon scroll, set state to true
    }

    authCheck = () => {
        const authenticated = Auth.isAuthenticated(); //set authenticated bool value to const
        alert(authenticated); //display alert whether the user is authenticated or not
    }

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state.formValidation)) {
            console.log(`
        --SUBMITTING--,
        name: ${this.state.name}
        email: ${this.state.email}
        `)
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formValidation = { ...this.state.formValidation }, input = this.state.populated;
        console.log(this.state.populated);
        switch (name) {
            case "name":
                formValidation.name = value.length < 3 || value.length > 20 ? "Name: at least 3 to 20 characters" : "";
                input[0] = value.length < 3 || value.length > 20 ? 0 : 1;
                break;
            case "email":
                formValidation.email = !emailRegex.test(value) ? "Invalid email address" : "";
                input[1] = (!emailRegex.test(value)) ? 0 : 1;
                break;
            default:
                break;
        }

        this.setState({
            formValidation, [name]: value,
            populated: input,
            allValid: (input.reduce((a, b) => a + b, 0) === 2)
        });
    };

    render() {
        const { articlesClimate, articlesDisaster, articlesWater, articlesLand, newsAPIError, formValidation, allValid } = this.state;

        function sendEMail(e) {
            e.preventDefault();

            emailjs.sendForm('gmail', 'template_19sxcfo', e.target, 'user_kWBOmMidDfrikWLc1aC0F')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset()
        }

        function sweetalertclick() {
            Swal.fire({
                icon: 'success',
                title: 'Subscribed',
                text: 'Thank you!',

            })
        }

        return (
            <div className="main">
                <div className="bga">
                    <div className="bg"></div>
                    <div className="bg bg2"></div>
                    <div className="bg bg3"></div>
                </div>
                <div className="header">
                    <h1 className="page-heading">How are you impacting the planet?</h1>
                </div>
                <div className="mission-statement">
                    <div className="main-container">
                        <h1>
                            We're <b>raising awareness</b> and <b>providing insight</b> on the different types of pollution, climate-related hazards, land degredation, and natural disasters that are affecting various regions of the world, <b>enabling</b> people to take action by reducing their environmental footprint.
                        </h1>
                    </div>
                    <div className="un-goals main-container">
                        <div className="un-logo"></div>
                        <div className="sustainable-goals">
                            <ClimateActionFlipCard />
                            <LifeBelowWaterFlipCard />
                            <LifeOnLandFlipCard />
                        </div>
                    </div>
                </div>
                    
                <div className="home-news main-container">
                    <div className="page-sub-heading" style={{ paddingBottom: 30 }}>
                        <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Top Stories</h3>
                    </div>
                    {newsAPIError ? <p>Could not fetch any articles. Please try again.</p> :
                        <div className="row news-articles">
                            <div className="col-lg-3 news-article">
                                <ArticleCard articles={articlesClimate} />
                            </div>
                            <div className="col-lg-3 news-article">
                                <ArticleCard articles={articlesDisaster} />
                            </div>
                            <div className="col-lg-3 news-article">
                                <ArticleCard articles={articlesWater} />
                            </div>
                            <div className="col-lg-3 news-article">
                                <ArticleCard articles={articlesLand} />
                            </div>
                        </div>
                    }
                </div>

                <div className="subscribe">
                    <div className="main-container">
                        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', paddingBottom: 5 }}>Subscribe to Our Going Green Digital newsletter</h2>
                        <form onSubmit={(e) => { sendEMail(e); this.handleSubmit(e) }} noValidate>
                            <div className="row" style={{ margin: '0 auto' }}>
                                <div className="col" style={{ padding: 0, marginRight: 3 }}>
                                <label style={{ fontSize: '1.1rem', fontWeight: '400', paddingBottom: 30, textAlign: 'left' }}>We'll send you occasional updates on what is happening around the planet. No spam, just the information you are after.</label>

                                </div>
                                <div className="col-1" style={{ padding: 0, marginLeft: 3 }}>
                                    <BsInfoCircleFill style={{ margin: '0 !important', fontSize: '2rem' }} className="newsletter-info-button" onClick={() => { this.handleModal() }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                {formValidation.name.length > 0 && (
                                    <p className="error-message" style={{fontSize: '1rem'}}>{formValidation.name}</p>
                                )}
                                <input 
                                    type="name" 
                                    className={formValidation.name.length > 0 ? "form-control register-input error" : "form-control register-input newsletter-input"} 
                                    placeholder="Name" name="name" onChange={this.handleChange} size="small" 
                                    style={{ padding: 9, paddingLeft: 20 }}    
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                {formValidation.email.length > 0 && (
                                    <p className="error-message" style={{fontSize: '1rem'}}>{formValidation.email}</p>
                                )}
                                <input
                                    className={formValidation.email.length > 0 ? "form-control register-input error" :
                                        "form-control newsletter-input register-input"}
                                    type="email" placeholder="Email" name="email"
                                    noValidate onChange={this.handleChange} size="small" 
                                    style={{ padding: 9, paddingLeft: 20 }}  
                                />
                            </div>
                            <button className="btn btn-light register-button" 
                                onClick={this.subscribe, () => { sweetalertclick(); }} 
                                disabled={!allValid} type="submit" 
                                style={{ width: '50%' }}>
                                    Subscribe
                            </button>
                        </form>

                        
                        <Modal show={this.state.show} >
                            <Modal.Header style={{ fontWeight: 'bold', paddingLeft: '2rem' }} >Why Subscribe?</Modal.Header>
                            <Modal.Body>
                                Updates from your local communities, 
                                information regarding any of our ongoing campaigns,
                                news related to any upcoming events, 
                                any new features that have been added to the webpage, and much more. So what are you waiting for? 
                                Sign up now!
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => { this.handleModal() }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home