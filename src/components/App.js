import React from 'react';

import LandingPageCard from './LandingPageCard';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollY: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({ scrollY: window.scrollY })
  }

  getHeroOpacity() {
    const { scrollY } = this.state;
    // return 0;
    // return (1 - (scrollY / 200));
  }

  render() {
    const { scrollY } = this.state;
    return(

      <div className="landing-container">
        <div className={`header ${scrollY > 0 ? 'header-white' : ''}`} >
          <a className="header-logo" href=""></a>
          <button className={`${scrollY > 0 ? '' : 'header-button-hidden'} header-button onboard-button`}>GET STARTED</button>
        </div>
        <section className="hero" /*style={{ opacity: this.getHeroOpacity() }}*/>
          {/* <div className="hero-circle-wrapper"> */}
            <div className="hero-circle">
              <div className="hero-circle-content">
                <h1 className="hero-title">Design cutting edge electronics in minutes.</h1>
                <button className="onboard-button">GET STARTED</button>
              </div>
            </div>
          {/* </div> */}
        </section>
        <section className="demo-section">
          {/* Consider removing the wrapper class below if not necessary */}
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Bring your ideas to life</h2>
            <p className="section-sub-heading">Learn to create custom circuit board designs with PCBflow, save work in progress diagrams, and export them when you're ready to build the real thing.</p>
          </div>
          <div className="design-to-pcb-demo">
            <div className="computer-wrapper">
              <img className="computer-image inline-image" src="src/images/computer.png" alt="computer" />
              <img className="design-tool-screenshot" src="src/images/design-tool-screenshot.png" alt="app screenshot" />
            </div>
            <img className="dots inline-image" src="src/images/dots.svg" alt="dots" />
            <img className="less-dots inline-image" src="src/images/less-dots.svg" alt="dots" />
            <img className="arrows inline-image" src="src/images/arrows.svg" alt="arrow" />
            <img className="circuit-board-image inline-image" src="src/images/real-pcb.jpg" alt="circuit board" />
          </div>
        </section>
        <section className="info-card-section row">
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Design with ease</h2>
            <p className="section-sub-heading">PCBflow's user friendly drag and drop interface is a breeze to learn and use.</p>
          </div>
          <div className="info-card-wrapper">
            <div className="col4">
              <LandingPageCard
                infoType="no-engineer"
                iconClassName="card-icon icon-wrench"
                title="No Engineers Required"
                content="PCBflow abstracts away the hard parts of printed circuit board design. You don’t need to worry about routing or connections."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                infoType="tutorial"
                iconClassName="card-icon icon-school"
                title="Interactive Tutorial"
                content="Our step by step tutorial will teach you how to reason about printed circuit board design while demostrating how to use the tool."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                infoType="price-estimate"
                iconClassName="card-icon icon-credit"
                title="Instant Price Estimates"
                content="Get a price estimate that updates automatically as you add and remove modules so you can keep your project under budget."
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
