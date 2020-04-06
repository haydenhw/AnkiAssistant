export var savedWordList = sessionStorage.getItem('wordList')
  ? JSON.parse(sessionStorage.getItem('wordList'))
  : null;

export var state = {
  currTerm: null,
  isInitialRender: true,
  wordList: savedWordList || [{ term: 'welcome', translation: 'bienvenido' }],
  errorMessages: {
    emptySearch: 'Please enter a search term',
    termNotFound(term) {
      return (
        `Sorry, we don't have a traslation for: <span class='not-found'>${term}. </span>` +
			'<br/> Please check for spelling errors or try another term.'
      );
    },
  },
};
