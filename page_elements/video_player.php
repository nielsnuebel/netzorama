<section id="video_player">
	<div class="container">
		<div class="video-item">
			<div class="border_1"></div>
			<div class="border_2"></div>
			<div class="stage">
				<div class="preview_img">
					<div id="video"></div>
				</div>
				<div class="text">
					<h4><?php echo $play_video->name; ?></h4>
					<h5><?php echo $play_video->franchise; ?></h5>
					<p><?php
						$desc = $play_video->description;
						echo $desc; ?>
					</p>
				</div>
			</div>
		</div>

	</div>
</section>