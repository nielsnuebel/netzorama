<!-- JavaScript -->
<script src="/js/netzorama.js"></script>
<script type="text/javascript">
	(function($) {
		$(document).ready(function () {
			$('.questions .left').click(function(){
				alert($(this).data('right'));
			});
		});
	})(this.jQuery);
</script>
<!-- Campaign Omniture Tracking -->
<script src="/js/AppMeasurement.js"></script>
<script>
	/* s = new AppMeasurement() // Site dependent info: need to be done only once per site(country)
	 s.account = "viacomedyde" // The account should be custom for each omniture suite that we want to track to.
	 s.charSet = "UTF-8"
	 s.currencyCode = ""
	 // Etc..

	 // Specific page tracking  (e.g a to sent each page) (you can extend the object params)
	 s.pageName    = "Netz-o-rama"
	 s.pageType    = ""
	 s.server      = ""
	 s.channel     = ""
	 s.referrer    = ""
	 s.hier1       = "site/campaign/netzorama"
	 s.campaign    = "netzorama"

	 s.t();*/
</script>