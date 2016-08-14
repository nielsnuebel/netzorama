<script src="/js/player.js"></script>
<script>
	generateSiteSectionFromUrl = function() {
		return location.href.replace(/#[^#]*$/, "").replace(/\?[^\?]*$/, "").replace(/^https:/, "").replace(/^http:/, "").replace(/www./, "").replace(/./, "").replace(/^https:[^https:]*$/, "").replace(/\/\//g, "").replace(/\./g, "").replace(/\//, "").replace(/\s/g, "").replace(/\:/g, "").replace(/\html/g, "").replace(/\htm/g, "");
	};

	var playObject = {
		"type": "<?php echo $play_video->type?>",
		"token": "<?php echo $play_video->id;?>",
		 "mrss": "<?php echo $play_video->mrss;?>"
	};

	VIACOM.Mediaplayer.assets = { playerSwfSrc: '/swf/g2player.swf' };

	window.playerconfig = {
		"assetPaths": { "g2player.swf": "/swf/g2player.swf" },
		"tld": "de",
		"ad_playpostrolls": true,
		"ads": {
		"enabled": true,
			"autoSID": true,
			"context": null,
			"defaults": {
			"interval": 0
		},
		"defaultAssetID": "41349526",
		"devicePrefixes": {
			"enabled": false,
			"phone": "",
			"tablet": ""
		},
		"engine": "Freewheel",
		"fallbackID": 41349526,
		"homedomain": "comedycentral.de",
		"library": " http://player.mtvnn.com/codebase/libraries/freewheel/release/AdManager.js",
		"manager": null,
		"midroll_intervals": {
			"longer_than_15": null,
			"longer_than_20": null,
			"longer_than_30": null
		},
		"networkID": 174975,
			"profileID": "174975:MTVNE_live_HTML5",
			"server": "http://2ab7f.v.fwmrm.net/ad/p/1",
			"viralSID": "comedyde/viral",
			"fw_ssid": "standupcomedycentralde"
	},
	"autoplay": false,
		"blankVideo": "http://player.mtvnn.com/codebase/blank.m4v",
		"controls": true,
		"domain": "comedy",
		"image": "<?php echo $play_video->preview_image_url;?>",
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
	}
	window.playerconfig.ads.fw_ssid = generateSiteSectionFromUrl();

	window.playerconfig.image = "<?php echo $play_video->preview_image_url;?>";

	var player = new VIACOM.Mediaplayer('#video', window.playerconfig);
	player.load(playObject.type, playObject.token, {}, null, playObject.mrss);
</script>