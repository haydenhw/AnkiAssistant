import React from 'react';

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
    return (1 - (scrollY / 750));
  }

  render() {
    const { scrollY } = this.state;
    return(
      <div className="container">
        <div className={`header ${scrollY > 0 ? 'header-white' : ''}`} >
          <a className="header-logo" href=""></a>
          <button className={`${scrollY > 0 ? '' : 'header-button-hidden'} header-button onboard-button`}>GET STARTED</button>
        </div>
        <section className="hero" style={{ opacity: this.getHeroOpacity() }}>
          <div className="hero-circle">
            <div className="hero-circle-content">
              <h1 className="hero-title">Design cutting edge electroics in minutes.</h1>
              <button className="onboard-button">GET STARTED</button>
            </div>
          </div>
      </section>
      <section className="computer">
      </section>
    </div>
  );
  }
}
