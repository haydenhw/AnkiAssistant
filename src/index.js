import $ from 'jquery';
import { Spinner } from 'spin.js';
import { spinnerOptions } from './spinnerOptions';

import './director.min.js';
import './styles/index.scss'
import './styles/main.css'
import './styles/icons/style.css'

var state = {
	currTerm: null,
	isInitialRender: true,
	wordList: [{
		term: "welcome",
		translation: "bienvenido",
	}],
	errorMessages: {
		emptySearch: "Please enter a search term",
		termNotFound: function(term) {
			return (
			"Sorry, we don't have a traslation for: <span class='not-found'>" + term + ". </span>" +
			"<br/> Please check for spelling errors or try another term."
		);
		}
	}
};

function processSearchResults(state, term, elements, callback) {
	return function(data) {
		toggleSpinner(elements);

		if (callback) {
			callback();
		}

		if (data.tuc[0] && data.tuc[0].phrase) {
			var termData = {
				term: term,
	 			translation: data.tuc[0].phrase.text,
	 		};

	 		state.currTerm = termData;
			$("form").find(elements.appInput).val("");
			renderSearchResults(state, termData, elements);

	 	} else {
      renderSearchResults(state, null, elements, "ERROR", state.errorMessages.termNotFound(term))
		}
	}
}

function processSearchResultsWithCallback(callback) {
	return function (state, term, elements) {
		 	return processSearchResults(state, term, elements, callback);
	}
}

function getApiData(state, elements, BASE_URL, searchString, callback ) {
	var query = {
		from: "eng",
		dest: "spa",
		format: "json",
		phrase: searchString,
		pretty: true
	};

	toggleSpinner(elements);
	$.getJSON(BASE_URL, query, callback(state, searchString, elements));
}

function toggleConvertButtonDisabled(state, elements) {
	const isWordListLengthZero = state.wordList.length === 0;
	elements.buttonConvert.prop("disabled", isWordListLengthZero);
}

function removeTerm(state, idx, elements) {
	state.wordList.splice(idx, 1);
	toggleConvertButtonDisabled(state, elements);
	renderList(state, elements);
}

function listToString(list) {
	return list.reduce(function(av, cv) {
		return av + cv.term + " ; " + cv.translation + "\n";
	}, "");
}
function renderSearchResults(state, termData, elements, resultType, msg) {
	var resultTemplate = resultType !== "ERROR"
		? (
			"<div class='js-term term inline'></div>"+
			"<div class='js-translation translation inline'></div>" +
			"<button class='js-button-add-term button-add-term'>" +
				"Add" +
			"</button>"
		)
		: (
			"<div class='js-error-wrapper error-wrapper'>" +
				"<div class='js-error error'>" + msg + "</div>" +
			"</div>" +
			"<button class='js-button-add-term button-add-term' disabled>" +
				"Add" +
			"</button>"
		);

	var wrapperTemplate = $(
		"<div class='js-search-result search-result well'>"+
			 resultTemplate +
		"</div>"
	);

	if (termData) {
		wrapperTemplate.find(elements.term).text(termData.term);
		wrapperTemplate.find(elements.translation).text(termData.translation);
		wrapperTemplate.find(".js-native").text(termData.nativeDef);
		wrapperTemplate.find(".js-target").text(termData.targetDef);
	}

	elements.searchResult.html(wrapperTemplate).addClass("search-result-container");

	if(!state.isInitialRender) {
		$(elements.buttonAddTerm).focus();
	}

	state.isInitialRender = false;
}

function renderItem(state, term, translation, idx, elements) {
	var template = $(
		"<div class='js-vocab-list-item vocab-list-item'>" +
		"	<div class='js-term term'></div>" +
		"	<div class='js-translation translation inline'></div>" +
			"<span class='js-button-remove-term button-remove-term icon-trash'></span>" +
		"</div>");
	template.find(".js-term").text(term);
	template.find(".js-translation").text(translation);
	template.find(".js-button-remove-term").click(function(){
		removeTerm(state, idx, elements);
	});
	return template;
}

function renderList(state, elements){
	var listHTML = state.wordList.map(function(term, idx) {
		return renderItem(state, term.term, term.translation, idx, elements);
	});

	$(".js-vocab-list-items").html(listHTML);
}

function renderError(msg, elements) {
	elements.errorWrapper.html("<div class='js-error error'>" + msg + "</div>");
}

function renderTextArea(wordList, elements) {
	var msg = "Almost done! Now just copy and paste this semicolon-separated list into a text file on your desktop and import into Anki.";
	var textAreaHTML = "<textarea class='text-list well'></textarea>";
	var listString = listToString(wordList);
	var textAreaHeight = wordList.length * 14 + 100 + 'px';

	elements.instructions.html(msg);
	elements.textArea
		.html(textAreaHTML)
		.find("textarea")
		.val(listString)
		.css("height", textAreaHeight);
}

function getPageMap(elements) {
	return {
		"APP": elements.appWrapper,
		"LANDING": elements.landingWrapper,
		"SEARCH": elements.searchWrapper,
	}
}

function showPage(pageMap, pageSelector, callback) {
	Object.keys(pageMap).forEach(function(page){
		if (page === pageSelector) {
			pageMap[page].css("display", "block");
		} else {
			pageMap[page].css("display", "none");
		}
	});

	if(callback) {
		callback();
	}
}

function showApp(elements) {
	const grey = "#f7f7f7";
	showPage(getPageMap(elements), "APP", function() {
		$("body").css("background-color", grey);
	});
}

function showLanding(elements) {
	const white = "#ffffff";
	showPage(getPageMap(elements), "LANDING", function() {
		$("body").css("background-color", white);
	});
}

function showSearch(elements) {
	const white = "#ffffff";
	showPage(getPageMap(elements), "SEARCH", function() {
		$("body").css("background-color", white);
	});
}

function toggleSpinner(elements) {
	elements.searchIcon.toggleClass("hide");
	elements.spinner.toggleClass("hide");
}

function initSubmitHandler(state, BASE_URL, elements, formElement, inputElement, callback) {
	$(formElement).submit(function(e) {
		e.preventDefault();
		var searchString = inputElement.val().toLowerCase();
		elements.errorWrapper.html("");

		if (searchString) {
			getApiData(state, elements, BASE_URL, searchString, processSearchResults);
		} else {
			renderSearchResults(state, null, elements, "ERROR", state.errorMessages.emptySearch);
			elements.appInput.val(searchString);
		}
	});
}

function initAddTermHandler(state, elements) {
	$(elements.searchResult).on("click", "button", function() {
		state.wordList.push(state.currTerm);
		toggleConvertButtonDisabled(state, elements);
		renderList(state, elements);
		elements.appInput.focus();
	});
}

function initConvertHandler(state, elements) {
	$(".js-button-convert").on("click", function() {
		var output = listToString(state.wordList);
		renderTextArea(state.wordList, elements);
	});
}

function initGetStartedHandler(elements) {
	$(elements.buttonOnboard).on("click", function() {
		window.location.href = "/#/app";
	});
}

function initLogoClickHandler(elements) {
	$(elements.appLogo).on("click", function() {
		window.location.href = "/#/";
	});
}

function main() {
	var BASE_URL = "https://glosbe.com/gapi/translate?callback=?";
	var elements = {
		appForm: $(".js-app-form"),
		appInput: $(".js-search-bar-input"),
		appLogo: $(".js-app-logo"),
		appWrapper: $(".js-app"),
		buttonAddTerm: ".js-button-add-term",
		buttonConvert: $(".js-button-convert"),
		buttonOnboard: $(".js-button-onboard"),
		error: $(".js-error"),
		errorWrapper: $(".js-error-wrapper"),
		instructions: $(".js-instructions"),
		landingWrapper: $(".js-landing"),
		nativeDef: ".js-nativeDef",
		searchForm: $(".js-search-form"),
		searchIcon: $(".js-search-bar-icon"),
		searchInput: $(".js-search-page-input"),
		searchPageSearch: $(".js-search-page-input"),
		searchResult: $(".js-search-result-container"),
		searchWrapper: $(".js-search"),
		spinner: $(".js-search-bar-spinner"),
		targetDef: ".js-targetDef",
		term: ".js-term",
		textArea: $(".js-textArea"),
		translation: ".js-translation",
	};

	if (!window.location.hash) {
		window.location.href = "/#/";
	}

	var routes = {
	'/': function() { showLanding(elements) },
  '/search': function() { showSearch(elements) },
  '/app': function() { showApp(elements) },
  };

	var router = Router(routes);
  router.init();

	var spinner = new Spinner(spinnerOptions).spin();
	elements.spinner.html(spinner.el)

	elements.appInput.focus();

  getApiData(state, elements, BASE_URL, 'welcome' , processSearchResultsWithCallback(function() {
		setTimeout(function() {
			state.isInitialRender = false;
		}, 0);
	}));

	renderList(state, elements);
	toggleConvertButtonDisabled(state, elements);

	initGetStartedHandler(elements);
	initLogoClickHandler(elements);
	initAddTermHandler(state, elements);
	initConvertHandler(state, elements);
	initSubmitHandler(state, BASE_URL, elements, elements.appForm, elements.appInput);
	initSubmitHandler(state, BASE_URL, elements, elements.searchForm, elements.searchInput);
}

$(main());
