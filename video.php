<?php
require_once __DIR__ . '/page_elements/config.php';

$id = $_GET['token'];

$play_video = null;

foreach($obj->videos as $video)
{
	if($video->id == $id)
	{
		$play_video = $video;
		break;
	}
}

// HEAD PARAMS
$head_title = $play_video->name .' - NETZ-O-RAMA AB. 28 AUGUST';
$head_desc = $play_video->description;
$head_fb_url = 'http://netz-o-rama.comedycentral.tv/';
$head_fb_image = 'http://netz-o-rama.comedycentral.tv/images/netz-o-rama.png';

?>
<?php require_once __DIR__ . '/page_elements/head.php'; ?>
<?php require_once __DIR__ . '/page_elements/nav.php'; ?>
<div id="page">
	<?php require_once __DIR__ . '/page_elements/header.php'; ?>

	<div class="singlepage-nav">
		<div class="container">
			<div class="menu-trigger2">Menü</div>
			<ul>
				<li><a href="/index.php#videos">Videos</a></li>
				<li><a href="/index.php#gewinnspiel">Gewinnspiel</a></li>
				<li><a href="/index.php#masud">Masud</a></li>
				<li>
					<a href="https://www.facebook.com/cc.tv" target="_blank" class="external"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook-f fa-stack-1x fa-inverse"></i></span></a>
					<a href="https://twitter.com/comedycentraltv" target="_blank" class="external"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
				</li>

			</ul>
		</div>
	</div>

	<?php
	if(!is_null($play_video))
		require_once __DIR__ . '/page_elements/video_player.php';
	?>

	<section id="videos">
		<div class="container">
			<h2>MEHR VIDEOS</h2>
			<div class="owl-carousel owl-theme">
			<?php foreach($obj->videos as $video):?>

				<?php if(!is_null($play_video) && $video->id == $play_video->id) continue; ?>
				<div class="video-item">
					<div class="border_1"></div>
					<div class="border_2"></div>
					<div class="stage">
						<div class="preview_img">
							<a href="<?php echo $video->id; ?>"><img src="<?php echo $video->preview_image_url; ?>" title="<?php echo $video->name; ?>" alt="<?php echo $video->name; ?>"></a>
						</div>
						<div class="text">
							<h4><?php echo $video->name; ?></h4>
							<p><?php

								$desc = $video->description;
								$desc_length = strlen ($desc);

								$desc = ($desc_length > $max_desc_length) ? substr($desc, 0, $max_desc_length) . $desc_subfix : $desc;
								echo $desc; ?>
							</p>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
			</div>
		</div>
	</section>


	<?php require_once __DIR__ . '/page_elements/footer.php'; ?>
</div><!-- #page -->
<?php require_once __DIR__ . '/page_elements/javascript.php'; ?>
<?php
	if(!is_null($play_video))
		require_once __DIR__ . '/page_elements/view_javascript.php';
?>

</body>
</html>

