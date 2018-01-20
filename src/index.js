import $ from 'jquery';
import { landingPage } from './landing.js'

import './styles/index.scss'
import './styles/main.css'
import './styles/icons/style.css'


var state = {
	currTerm: null,
	wordList: [],
	errorMessages: {
		emptySearch: "Please enter a search term",
		termNotFound: "Sorry, we don't have a traslation for that term.<br>Please check for spelling errors or try another term."
	}
};

function processSearchResults(state, term, elements) {
	return function(data) {
		if (data.tuc[0]) {
			var termData = {
				term: term,
	 			translation: data.tuc[0].phrase.text
	 		};
	 		state.currTerm = termData;
			renderSearchResults(termData, elements);
			$("form").find(elements.search).val("");
	 	} else {
			renderError(state.errorMessages.termNotFound, elements);
		}
	}
}

function getApiData(state, BASE_URL, searchString, callback, elements) {
	var query = {
		from: "eng",
		dest: "spa",
		format: "json",
		phrase: searchString,
		pretty: true
	};

	$.getJSON(BASE_URL, query, callback(state, searchString, elements));
}

function toggleConvertButtonDisabled(state, elements) {
	const isWordListLengthZero = state.wordList.length === 0;
	elements.buttonConvert.prop("disabled", isWordListLengthZero);
}

function removeTerm(state, idx, elements) {
	state.wordList.splice(idx, 1);
	toggleConvertButtonDisabled(state, elements);
	renderList(state);
}

function listToString(list) {
	return list.reduce(function(av, cv) {
		return av + cv.term + " ; " + cv.translation + "\n";
	}, "");
}

function renderSearchResults(termData, elements) {
	var template = $(
		"<div class='js-search-result search-result well'>"+
			"<div class='js-term term inline'></div>"+
			"<div class='js-translation translation inline'></div>"+
			"<button class='button-add-term'>" +
				"<div class='icon-plus'></div>" +
			"</button>" +
		"</div>"
	);
	template.find(elements.term).text(termData.term);
	template.find(elements.translation).text(termData.translation);
	template.find(".js-native").text(termData.nativeDef);
	template.find(".js-target").text(termData.targetDef);

	elements.searchResult.html(template).addClass("search-result-container");
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
	elements.error.html(msg);
}

function renderTextArea(output, elements) {
	var msg = "Almost done! Now just copy and paste this semicolon-separated list into a text file on your desktop and import into Anki.";
	var textAreaHTML = "<textarea class='text-list well'></textarea>";
	elements.instructions.html(msg);
	elements.textArea.html(textAreaHTML);
	elements.textArea.find("textarea").val(output);
}

function toggleLandingPage(elements) {
	$("body").toggleClass("grey-background");
  elements.landingWrapper.toggleClass("hide");
  elements.appWrapper.toggleClass("hide");
}

function initSubmitHandler(state, BASE_URL, elements) {
	$("form").submit(function(e) {
		e.preventDefault();
		var searchString = $(".js-search-bar-input").val().toLowerCase();
		renderError("", elements);
		elements.searchResult.html("").removeClass("search-result-container");

		if (searchString) {
			getApiData(state, BASE_URL, searchString, processSearchResults, elements);
		} else {
			renderError(state.errorMessages.emptySearch, elements);
		}
	});
}

function initAddTermHandler(state, elements) {
	$(elements.searchResult).on("click", "button", function() {
		state.wordList.push(state.currTerm);
		toggleConvertButtonDisabled(state, elements);
		renderList(state, elements);
	});
}

function initConvertHandler(state, elements) {
	$(".js-button-convert").on("click", function() {
		var output = listToString(state.wordList);
		renderTextArea(output, elements);
	});
}

function initToggleLandingHandlers(elements) {
	$(elements.buttonOnboard).add(elements.appLogo).on("click", function() {
		toggleLandingPage(elements);
	});
}

function main() {
	var BASE_URL = "https://glosbe.com/gapi/translate?callback=?";
	var elements = {
		appWrapper: $(".js-app"),
		appLogo: $(".js-app-logo"),
		error: $(".js-search-bar-error"),
		buttonOnboard: $(".js-button-onboard"),
		buttonConvert: $(".js-button-convert"),
		instructions: $(".js-instructions"),
		landingWrapper: $(".js-landing"),
		nativeDef: ".js-nativeDef",
		searchResult: $(".js-search-result-container"),
		search: $(".js-search-bar-input"),
		targetDef: ".js-targetDef",
		term: ".js-term",
		textArea: $(".js-textArea"),
		translation: ".js-translation",
	};
	toggleLandingPage(elements);

	// for testing purposes
	getApiData(state, BASE_URL, 'hello', processSearchResults, elements);
	//



	initToggleLandingHandlers(elements);
	initSubmitHandler(state, BASE_URL, elements);
	initAddTermHandler(state, elements);
	initConvertHandler(state, elements);
}

$(main());
