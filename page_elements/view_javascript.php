<script src="/js/player.js"></script>
<script>
	generateSiteSectionFromUrl = function() {
		return location.href.replace(/#[^#]*$/, "").replace(/\?[^\?]*$/, "").replace(/^https:/, "").replace(/^http:/, "").replace(/www./, "").replace(/./, "").replace(/^https:[^https:]*$/, "").replace(/\/\//g, "").replace(/\./g, "").replace(/\//, "").replace(/\s/g, "").replace(/\:/g, "").replace(/\html/g, "").replace(/\htm/g, "");
	};

	var playObject = {
		"type": "<?php echo $play_video->type;?>",
		"token": "<?php echo $play_video->id;?>",
		 "mrss": "<?php echo $play_video->mrss;?>"
	};

	VIACOM.Mediaplayer.assets = { playerSwfSrc: 'swf/g2player.swf' };
	window.playerconfig = {
		"assetPaths": { "g2player.swf": "/swf/g2player.swf" },
		"tld": "de",
		"controls": true,
		"domain": "comedy",
		"autoplay": true,
		"localization": {
			"language": "de",
			"country": "DE",
			"translations": {
				"countdown": "WERBUNG. Video startet in {seconds} sekunden",
				"quality": "Qualität",
				"autorendition": "Auto",
				"turnoffadblocker": "Bitte schalte Deinen Adblocker aus um das Video sehen zu können",
				"config_error": "Sorry! Der Player konnte nicht konfiguriert werden! <br />Wir arbeiten momentan daran...",
				"asset_error": "Sorry! Das Video konnte nicht geladen werden...",
				"script_error": "Ooops! Hier fehlen ein paar wichtige Skripte...",
				"asset_not_available_error": "Sorry! Das Video ist auf mobilen Endgeräten nicht verfügbar...",
				"no_connection_error": "Ooops! Keine Verbindung zum Server...",
				"content_not_available_error": "Sorry! Diese Inhalte sind aufgrund der rechtlichen Lage nicht verfügbar.",
				"generic_error": "Ooops! Etwas ist schiefgelaufen... <br />Wir bearbeiten das Problem!<br />Danke für deine Geduld!",
				"wrong_language": "Sorry! Dieses Video ist in deiner Sprache nicht verfügbar!",
				"suspended_loading": "Sorry! Der Ladevorgang für dieses Video wurde unterbrochen!<br />Erneuter Versuch in <span class='seconds'>5</span> Sekunden...",
				"just_seen": "Gerade angeschaut",
				"related_videos": "Verwandte Videos:",
				"replay": "Replay"
			}
		},
		"customVideoAttributes": {
			"controls": true,
			"webkit-playsinline": true
		},
		"debug": true
	}
	/*    window.playerconfig = {
	 "assetPaths": { "g2player.swf": "/swf/g2player.swf" },
	 "tld": "de",

	 "autoplay": true,
	 "blankVideo": "http://player.mtvnn.com/codebase/blank.m4v",
	 "controls": true,
	 "domain": "comedy",
	 "image": "http://staging.riptide.mtvnn.com/586db2a0b5cfd9551cbf1f1417af6e44/640x",
	 "localisation": {},
	 "localization": {
	 "language": "de",
	 "country": "DE",
	 "translations": {
	 "countdown": "WERBUNG. Video startet in {seconds} sekunden",
	 "quality": "Qualität",
	 "autorendition": "Auto",
	 "turnoffadblocker": "Bitte schalte Deinen Adblocker aus um das Video sehen zu können",
	 "config_error": "Sorry! Der Player konnte nicht konfiguriert werden! <br />Wir arbeiten momentan daran...",
	 "asset_error": "Sorry! Das Video konnte nicht geladen werden...",
	 "script_error": "Ooops! Hier fehlen ein paar wichtige Skripte...",
	 "asset_not_available_error": "Sorry! Das Video ist auf mobilen Endgeräten nicht verfügbar...",
	 "no_connection_error": "Ooops! Keine Verbindung zum Server...",
	 "content_not_available_error": "Sorry! Diese Inhalte sind aufgrund der rechtlichen Lage nicht verfügbar.",
	 "generic_error": "Ooops! Etwas ist schiefgelaufen... <br />Wir bearbeiten das Problem!<br />Danke für deine Geduld!",
	 "wrong_language": "Sorry! Dieses Video ist in deiner Sprache nicht verfügbar!",
	 "suspended_loading": "Sorry! Der Ladevorgang für dieses Video wurde unterbrochen!<br />Erneuter Versuch in <span class='seconds'>5</span> Sekunden...",
	 "just_seen": "Gerade angeschaut",
	 "related_videos": "Verwandte Videos:",
	 "replay": "Replay"
	 }
	 },
	 "reporting": {
	 "enabled": "true",
	 "interval": 10,
	 "omniture": {
	 "defaults": "viacomedycentraldebroadband",
	 "defaultsTracking": {
	 "pageUrl": "{url}",
	 "pageName": "video/net/standup/{title_tag}",
	 "hier1": "video/net/standup/{title_tag}/{action}",
	 "prop12": "DE",
	 "prop30": "{mediagenid}",
	 "prop36": "{franchise}",
	 "prop38": "comedycentral.de",
	 "prop45": "{type}",
	 "prop46": "{artist}",
	 "prop48": "Flash Player",
	 "prop49": "comedycentral.de/standup",
	 "prop50": "{title_tag}"
	 },
	 "enabled": true,
	 "label": "via",
	 "library": "http://player.mtvnn.com/codebase/libraries/s_code.js",
	 "pageNameBase": "video/net/standup/Episode_"
	 }
	 },
	 "customVideoAttributes": {
	 "controls": true,
	 "webkit-playsinline": true
	 },
	 "debug": false
	 };
	 */
	window.playerconfig.autoplay = true;

	window.playerconfig.image = "<?php echo $play_video->preview_image_url;?>";

	var player = new VIACOM.Mediaplayer('#video', window.playerconfig);
	player.load(playObject.type, playObject.token, {}, null, playObject.mrss);
</script>