import $ from "jquery";

export default class ReplacerEmotes {

	constructor(nodes){
		this.nodeTestRegEx = /\w+?/gi;
		this.blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "NOSCRIPT", "LINK", "TEMPLATE", "INPUT", "IFRAME", "SVG", "IMG"];
		if(nodes){
			this.listReplaceNodes = nodes
		} else {
			this.listReplaceNodes = [
				'.im-mess',
				'.reply'
			]
		}
	}

	set emotes(emotes){
		this.emoteList = emotes
	}

	startReplaceLoop(){		
        console.log("Monka start replace");
		this.listReplaceNodes.forEach(node => {
			this.replaceEmotesInNode(node)
		});
	}
	
	replaceEmotesInNode(parent) {
		let _this = this

		$(`${parent} *`).filter(function() {
			return (_this.blacklistedTags.indexOf($(this).prop("tagName")) == -1);
		}).each(function() {
			$(this).contents().filter(function() {
				return (this.nodeType == 3 && this.textContent.match(_this.nodeTestRegEx));
			}).each(function() {
				_this.replacePhrasesWithEmotes(this);
			});
		});
	}
	
	replacePhrasesWithEmotes(element) {
		var elementContent = element.textContent;
		for (var emoteName in this.emoteList) {
			elementContent = elementContent.replace(
				this.emoteList[emoteName].code,
				this.getHtmlEmote(this.emoteList[emoteName])
			);
		}
		if (element.textContent != elementContent) {
			$(element).replaceWith(elementContent);		
		}
	}
	
	getHtmlEmote(emote) {
		return  `<div class="monka__insert__emote"> <img src="${emote.images['1x']}" alt="${emote.code}"> </div>`
	}
}
