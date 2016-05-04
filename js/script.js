
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
		setupNavbarButton('educationButton', 'educationSection');
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

	var viewer = new ModelViewer('canvas3d');
	viewer.addScene('test1', 'test');
	viewer.addScene('test2', 'test');
	viewer.addScene('test3', 'test');
	viewer.addScene('test4', 'test');
});
