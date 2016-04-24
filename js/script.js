
$( document ).ready(function(){

	function setupNavBar() {
		function setupNavbarButton(buttonId, sectionId) {
			$('#'+buttonId).on('click', function(){
				$.scrollTo('#'+sectionId, 700, {easing: 'easeInOutCubic'});
			});
		}
		setupNavbarButton('introButton', 'introSection');
		setupNavbarButton('experienceButton', 'experienceSection');
		setupNavbarButton('skillsButton', 'skillsSection');
		setupNavbarButton('sideProjectsButton', 'sideProjectsSection');
		setupNavbarButton('aboutButton', 'aboutSection');
		setupNavbarButton('contactButton', 'contactSection');
	};

	function setupSkipButton() {
		$('#skipButton').on('click', function(){
			$.scrollTo('#experienceSection', 700, {easing: 'easeInOutCubic'});
		});
	};

	setupNavBar();
	setupSkipButton();
});
