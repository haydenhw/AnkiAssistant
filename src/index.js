import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// if (module.hot) {
//   console.log('it\'s hot')
//   module.hot.accept('./components/App.js', () => {
//     ReactDOM.render(<App />, document.getElementById('root'))
//   });
// }
