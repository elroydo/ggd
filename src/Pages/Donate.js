import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Components/Donate/donate.css';
import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
class Donate extends Component {
    render() {
        return (
            <div className="main">
                <div className="heading" style={{ paddingTop: 30, paddingBottom: 10 }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Places to Donate</h2>
                </div>
                <div clasName="charity-information" style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <p style={{ textAlign: 'center' }}>The following charities are high-impact, cost-effective, and evidence-based. Donate below!</p>
                </div>
                <div className="carousel-wrapper">
                    <div className="charities">
                        <Carousel
                            indicators={false}
                            controls={true}
                            fade={true}
                            interval={5000}
                            style={{ margin: 40 }}
                            nextIcon={""}
                            prevIcon={""}
                            nextLabel={<button className="btn btn-outline-success news-button news-button-right" style={{ position: 'absolute', top: 0, left: 0, borderRadius: "50%" }} type="button">&#10148;</button>}
                            prevLabel={<button className="btn btn-outline-success news-button news-button-left" style={{ position: 'absolute', top: 0, right: 0, borderRadius: "50%" }} type="button">&#10148;</button>}
                        >
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>Rainforest Foundation US</h5>
                                <img src="https://initiative20x20.org/sites/default/files/styles/1_3_width/public/2019-08/rfus_0.JPG?itok=D0qUohiV" style={{ width: 550, padding: 60 }} alt="food" />
                                <p className="d-block w-100"><b>About</b><br /> The mission of the Rainforest Foundation is to support indigenous and traditional peoples of the world’s rainforests in their efforts to protect their environment and fulfill their rights</p>
                                <div className="button-container">
                                    <div className="button-one">
                                        <Button href="https://rainforestfoundation.org/donate/" className="button1" target="_blank">Donate to the Rainforest Foundation US</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>The WWF</h5>
                                <img src="https://i.ytimg.com/vi/GbIeg6DTruU/maxresdefault.jpg" style={{ width: 400, padding: 30 }} alt="flights" />
                                <p className="d-block w-100"><b>About</b><br /> The WWF makes a real difference. Unbiased, independent and respected, they are one of the best placed organisations to protect your planet. Donations can be made to a number of different funds/projects</p>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-two">
                                        <Button href="https://support.wwf.org.uk/donate-to-wwf?_ga=2.56953962.1560434147.1616107569-35439303.1616107569" className="button1" target="_blank">Donate to the WWF</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>Climate Emergency Fund</h5>
                                <img src="https://climateemergencyfund.org/wp-content/uploads/2020/10/CEF_logo_BlueTransparent-2.png" style={{ width: 300, padding: 30 }} alt="electricity" />
                                <p className="d-block w-100"><b>About</b><br />Funding the most impactful climate activists working to disrupt the status quo, inspire others to do the same and force policy-makers to take action. Working to turbocharge activism, put pressure on government leaders, divest from fossil fuel financing, and diversify the movement by engaging new voices</p>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-three">
                                        <Button href="https://climateemergencyfund.org/?form=donate" className="button1" target="_blank">Donate to the Climate Emergency Fund</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>The Climate Coalition</h5>
                                <img src="https://pbs.twimg.com/profile_images/1217144200862543872/MH7AVj67_400x400.jpg" style={{ width: 220, padding: 30 }} alt="appliances" />
                                <p className="d-block w-100"><b>About </b><br /> The UK’s largest group of people dedicated to action against climate change. A group of over 140 organisations — including the National Trust, Women's Institute, Oxfam, and RSPB —  and 22 million voices strong.</p>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-four">
                                        <Button href="https://www.theclimatecoalition.org/give-a-gift" className="button1" target="_blank">Donate to The Climate Coalition</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>Marine Conservation Society</h5>
                                <img src="https://upload.wikimedia.org/wikipedia/en/2/20/Marine_Conservation_Society_%28UK%29_Logo.jpg" style={{ width: 300, padding: 40 }} alt="car" />
                                <p className="d-block w-100"><b>About </b><br /> You could be about to do something wonderful for our seas, shores and marine wildlife. Your donation will help MCS ensure that UK seas are fit for life - clean seas and coasts supporting abundant marine life, healthy fish stocks and enjoyment for all.</p>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-five">
                                        <Button href="https://www.mcsuk.org/donate" className="button1" target="_blank">Donate to the Marine Conservation Society</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h5 className="d-block w-100" style={{ fontWeight: 'bold' }}>How Else You Can Make A Difference</h5>
                                <p><b>Things you can do: </b></p>
                                <p className="d-block w-100">As well as donating, you can make a difference in the fight against climate change by viewing actions that you can take to make a difference, calculating your carbon footprint to see how your emissions compare to the global average, and viewing an interactive map to see how CO<sub>2</sub> emissions have changed since 1950</p>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-actions">
                                        <Button href="/actions" className="button1">View actions</Button>
                                    </div>
                                </div>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-carbon-footprint">
                                        <Button href="/carbon-footprint-calc" className="button1">Calculate carbon footprint</Button>
                                    </div>
                                </div>
                                <div className="button-container" style={{ textAlign: 'center' }}>
                                    <div className="button-more-info">
                                        <Button href="/more-info" className="button1">View interactive map</Button>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>

                    </div>


                </div>



            </div>
        )
    }
}

export default Donate;