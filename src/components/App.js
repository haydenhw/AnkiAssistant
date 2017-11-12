import React from 'react';

const helloOnScroll = () => {
}

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

    console.log(this.state)
  }

  render() {
    const { scrollY } = this.state;
    return(
      <div className="container">
        <div className={`header ${scrollY > 0 ? 'header-white' : ''}`} >
          <a className="header-logo" href=""></a>
          <button className="header-button onboard-button">GET STARTED</button>
        </div>
        <section className="hero">
          <div className="hero-circle">
            <div className="hero-circle-content">
              <h1 className="hero-title">Design cutting edge electroics in minutes.</h1>
            </div>
          </div>
      </section>
      <section className="computer">

      </section>
    </div>
  )

  }
}
