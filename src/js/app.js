import $ from 'jquery';
import { Spinner } from 'spin.js';
import { API_KEY, BASE_URL, spinnerOptions } from './config';
import { elements } from './elements';
import { savedWordList, state } from './state';

import '../styles/index.scss';
import '../styles/icons/style.css';


function processSearchResults(state, term, elements, callback) {
  return function(data) {
    toggleSpinner(elements);

    if (callback) {
      callback();
    }

    if (data
      && data.length > 0
      && data[0].shortdef
    ) {
      const termData = {
        term,
        // override translation for the term 'welcome'
        translation: term === 'welcome' ? 'bienvenido' : data[0].shortdef[0],
      };

      elements.searchForm.find(elements.searchBarInput).val('');
      state.currTerm = termData;
      renderSearchResults(state, termData, elements);
    } else {
      renderSearchResults(state, null, elements, 'ERROR', state.errorMessages.termNotFound(term));
    }
  };
}

function processSearchResultsWithCallback(callback) {
  return function (state, term, elements) {
    return processSearchResults(state, term, elements, callback);
  };
}

function getApiData(state, elements, BASE_URL, searchString, callback) {
  const apiUrl = `${BASE_URL}${searchString}?key=${API_KEY}`;
  toggleSpinner(elements);
  $.getJSON(apiUrl, null, callback(state, searchString, elements));
}

function toggleConvertButtonDisabled(state, elements) {
  const isWordListLengthZero = state.wordList.length === 0;
  elements.buttonConvert.prop('disabled', isWordListLengthZero);
}

function removeTerm(state, idx, elements) {
  state.wordList.splice(idx, 1);
  sessionStorage.setItem('wordList', JSON.stringify(state.wordList));
  toggleConvertButtonDisabled(state, elements);
  renderVocabList(state, elements);
}

function listToString(list) {
  return list.reduce((av, cv) => {
    return `${av + cv.term} ; ${cv.translation}\n`;
  }, '');
}

function getPageMap(elements) {
  return {
    APP: elements.appWrapper,
    LANDING: elements.landingWrapper,
    SEARCH: elements.searchWrapper,
  };
}

function showPage(pageMap, pageSelector, callback) {
  Object.keys(pageMap).forEach((page) => {
    if (page === pageSelector) {
      pageMap[page].css('display', 'block');
    } else {
      pageMap[page].css('display', 'none');
    }
  });

  if (callback) {
    callback();
  }
}

function showApp(elements) {
  showPage(getPageMap(elements), 'APP', () => {
    elements.searchBarInput.focus();
    const grey = '#f7f7f7';
    $('body').css('background-color', grey);
  });
}

function showLanding(elements) {
  showPage(getPageMap(elements), 'LANDING', () => {
    const white = '#ffffff';
    $('body').css('background-color', white);
  });
}

function showSearch(elements) {
  showPage(getPageMap(elements), 'SEARCH', () => {
    const white = '#ffffff';
    $('body').css('background-color', white);
  });
}

function toggleSpinner(elements) {
  elements.searchIcon.toggleClass('hide');
  elements.spinner.toggleClass('hide');
}

function renderSearchResults(state, termData, elements, resultType, msg) {
  const resultTemplate = resultType !== 'ERROR'
    ? (
      "<div class='js-term term inline'></div>" +
      "<div class='js-translation translation inline'></div>" +
      "<button class='js-button-add-term button-add-term'>" +
        'Add' +
      '</button>'
    )
    : (
      `${"<div class='js-error-wrapper error-wrapper'>" +
        "<div class='js-error error'>"}${msg}</div>` +
      '</div>' +
      '<button class=\'js-button-add-term button-add-term\' disabled>' +
        'Add' +
      '</button>'
    );

  const wrapperTemplate = $(
    `<div class='js-search-result search-result well'>${
      resultTemplate
    }</div>`,
  );


  if (termData) {
    wrapperTemplate.find(elements.term).text(termData.term);
    wrapperTemplate.find(elements.translation).text(termData.translation);
  }

  elements.searchResult.html(wrapperTemplate).addClass('search-result-container');

  if (!state.isInitialRender) {
    $(elements.buttonAddTerm).focus();
  }

  state.isInitialRender = false;
}

function renderVocabListItem(state, term, translation, idx, elements) {
  const template = $(
    "<div class='js-vocab-list-item vocab-list-item'>" +
    "  <div class='js-term term'></div>" +
    "  <div class='js-translation translation inline'></div>" +
      "<span class='js-button-remove-term button-remove-term icon-trash'></span>" +
    '</div>');

  template.find('.js-term').text(term);
  template.find('.js-translation').text(translation);
  template.find('.js-button-remove-term').click(() => {
    removeTerm(state, idx, elements);
  });
  return template;
}

function renderVocabList(state, elements) {
  const listHTML = state.wordList.map((term, idx) =>
    renderVocabListItem(state, term.term, term.translation, idx, elements)
  );

  elements.vocabListItems.html(listHTML);
}

function renderSemicolonSeparatedList(wordList, elements) {
  const msg = 'Almost done! Now just copy and paste this semicolon-separated list into a text file on your desktop and import into Anki.';
  const textAreaHTML = "<textarea class='text-list well'></textarea>";
  const listString = listToString(wordList);
  const textAreaHeight = `${(wordList.length * 14) + 100}px`;

  elements.instructions.html(msg);
  elements.textArea
    .html(textAreaHTML)
    .find('textarea')
    .val(listString)
    .css('height', textAreaHeight);
}

function initSubmitHandler(state, BASE_URL, elements, formElement, inputElement) {
  $(formElement).submit((e) => {
    e.preventDefault();
    elements.errorWrapper.html('');

    const searchString = inputElement.val().toLowerCase();
    if (searchString) {
      getApiData(state, elements, BASE_URL, searchString, processSearchResults);
    } else {
      renderSearchResults(state, null, elements, 'ERROR', state.errorMessages.emptySearch);
      elements.searchBarInput.val(searchString);
    }
  });
}

function initAddTermHandler(state, elements) {
  $(elements.searchResult).on('click', 'button', () => {
    state.wordList.push(state.currTerm);
    sessionStorage.setItem('wordList', JSON.stringify(state.wordList));
    toggleConvertButtonDisabled(state, elements);
    renderVocabList(state, elements);
    elements.searchBarInput.focus();
  });
}

function initConvertHandler(state, elements) {
  elements.buttonConvert.on('click', () => {
    renderSemicolonSeparatedList(state.wordList, elements);
  });
}

function initGetStartedHandler(elements) {
  $(elements.buttonOnboard).on('click', () => {
    window.location.href = '/#/app';
  });
}

function initLogoClickHandler(elements) {
  $(elements.appLogo).on('click', () => {
    window.location.href = '/#/';
  });
}

function main() {
  if (!window.location.hash) {
    window.location.href = '/#/';
  }

  const routes = {
    '/': function() { showLanding(elements); },
    '/search': function() { showSearch(elements); },
    '/app': function() { showApp(elements); },
  };

  const router = Router(routes);
  router.init();

  const spinner = new Spinner(spinnerOptions).spin();
  elements.spinner.html(spinner.el);

  elements.searchBarInput.focus();

  // if this is the first time a user is visiting we want to populate a search result for demonstration purposes
  // if there is nothing in the users search history we search the for term 'welcome'
  const lastSearchedWord = savedWordList && savedWordList.length > 0
    ? savedWordList[savedWordList.length - 1].term
    : 'welcome';
  getApiData(state, elements, BASE_URL, lastSearchedWord, processSearchResultsWithCallback(() => {
    setTimeout(() => {
      state.isInitialRender = false;
    }, 0);
  }));

  renderVocabList(state, elements);
  toggleConvertButtonDisabled(state, elements);

  initGetStartedHandler(elements);
  initLogoClickHandler(elements);
  initAddTermHandler(state, elements);
  initConvertHandler(state, elements);
  initSubmitHandler(state, BASE_URL, elements, elements.searchForm, elements.searchBarInput);
}

$(main());
