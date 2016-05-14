
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

	function setupMenuButton() {
		$('#menuButton').on('click', function(){
			var $nav = $('body > nav');
			if ( $nav.hasClass( 'displayed' ) ) {
				$nav.removeClass( 'displayed' );
			} else {
				$nav.addClass( 'displayed' );
			}
		});
	}

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
		viewer.addScene('exp01', '42iq2');
		viewer.addScene('exp02', 'cnp');
		viewer.addScene('exp03', '42iq1');
		viewer.addScene('exp04', 'gears');
		viewer.addScene('exp05', 'gears');
		viewer.addScene('exp06', 'gears');
		viewer.addScene('exp07', 'gears');
		viewer.addScene('exp08', 'gears');
		viewer.addScene('exp09', 'gears');
		viewer.addScene('exp10', 'gears');
		viewer.addScene('exp11', 'gears');
		viewer.addScene('sideLuna', 'luna');
		viewer.addScene('sideMaze', 'maze');
		viewer.addScene('sideSite', 'gears');
		viewer.addScene('sidePixel', 'pixel');
		viewer.addScene('sidePhoto', 'photo');
	}

	var outline = setupNavBar(outline);
	setupMenuButton();
	setupSkipButton();
	setupActiveSection(outline);
	updateActiveButton(outline);

	setup3DViews();
});
