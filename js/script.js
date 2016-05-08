
$( document ).ready(function(){
	"use strict";

	function setupNavBar() {

		function setupNavbarButton(buttonId, sectionId) {
			var $button = $('#'+buttonId);
			var $section = $('#'+sectionId);

			$button.on('click', function(){
				$.scrollTo('#'+sectionId, 700, {easing: 'easeInOutCubic'});
			});

			var item = { button: $button, section: $section };
			outline.push(item);
		}

		var outline = [];

		setupNavbarButton('introButton', 'introSection');
		setupNavbarButton('experienceButton', 'experienceSection');
		setupNavbarButton('skillsButton', 'skillsSection');
		setupNavbarButton('sideProjectsButton', 'sideProjectsSection');
		setupNavbarButton('educationButton', 'educationSection');
		setupNavbarButton('aboutButton', 'aboutSection');
		setupNavbarButton('contactButton', 'contactSection');

		return outline;
	};

	function setupSkipButton() {
		$('#skipButton').on('click', function(){
			$.scrollTo('#experienceSection', 700, {easing: 'easeInOutCubic'});
		});
	};

	function updateActiveButton(outline) {
		var offset = $(document).scrollTop();
		for (var i = 1; i < outline.length; i++) {
			var prevItem = outline[i-1];
			var item = outline[i];
			var itemOffset = item.section.offset().top;
			if ((offset+150) < itemOffset) {
				prevItem.button.addClass('active');
				item.button.removeClass('active');
				break;
			} else {
				prevItem.button.removeClass('active');
				item.button.addClass('active');
			}
		}
	}

	function setupActiveSection(outline) {
		$(document).on( 'scroll', updateActiveButton.bind(null, outline));
	}

	function setup3DViews() {
		var viewer = new ModelViewer('canvas3d');
		viewer.addScene('exp01', 'test');
		viewer.addScene('exp02', 'test');
		viewer.addScene('exp03', 'test');
		viewer.addScene('exp04', 'test');
		viewer.addScene('exp05', 'test');
		viewer.addScene('exp06', 'test');
		viewer.addScene('exp07', 'test');
		viewer.addScene('exp08', 'test');
		viewer.addScene('exp09', 'test');
		viewer.addScene('exp10', 'test');
		viewer.addScene('exp11', 'test');
		viewer.addScene('sideLuna', 'test');
		viewer.addScene('sideMaze', 'test');
		viewer.addScene('sideSite', 'test');
		viewer.addScene('sidePixel', 'test');
		viewer.addScene('sidePhoto', 'test');
	}

	var outline = setupNavBar(outline);

	setupSkipButton();
	setupActiveSection(outline);
	updateActiveButton(outline);

	setup3DViews();
});
