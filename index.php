<?php require_once __DIR__ . '/page_elements/config.php'; ?>
<?php
// HEAD PARAMS
$head_title = 'NETZ-O-RAMA AB. 28 AUGUST';
$head_desc = 'NETZ-O-RAMA AB. 28 AUGUST';
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
                <li><a href="#videos">Videos</a></li>
                <li><a href="#gewinnspiel">Gewinnspiel</a></li>
                <li><a href="#masud">Masud</a></li>
                <li>
                    <a href="https://www.facebook.com/cc.tv" target="_blank" class="external"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook-f fa-stack-1x fa-inverse"></i></span></a>
                    <a href="https://twitter.com/comedycentraltv" target="_blank" class="external"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
                </li>

            </ul>
        </div>
    </div>
    <section id="slider">
        <div class="owl-carousel owl-theme">
            <div class="item">
                <div class="slide_wrapper">
                    <img src="images/slide_1.jpg">
                    <div class="text text-right">
                        <p>WHO THE FUCK<br>IS MASUD?</p>
                        <div class="netz_btn">
                            <div class="border_1"></div>
                            <div class="border_2"></div>
                            <a href="#masud" class="stage">MEHR INFOS</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="slide_wrapper">
                    <img src="images/slide_2.jpg">
                    <div class="text text-right">
                        <p>"CLIP ODER NIETE?"<br>SPIELEN UND<br>iPAD GEWINNEN!</p>
                        <div class="netz_btn">
                            <div class="border_1"></div>
                            <div class="border_2"></div>
                            <a href="#gewinnspiel" class="stage">MEHR</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="videos">
        <div class="container">
            <h2>NEUE VIDEOS</h2>
            <div class="owl-carousel owl-theme">
            <?php foreach($obj->videos as $video):?>
                <div class="video-item">
                    <div class="border_1"></div>
                    <div class="border_2"></div>
                    <div class="stage">
                        <div class="preview_img">
                            <a href="video/<?php echo $video->id; ?>"><img src="<?php echo $video->preview_image_url; ?>" title="<?php echo $video->name; ?>" alt="<?php echo $video->name; ?>"></a>
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
    <?php require_once __DIR__ . '/page_elements/gewinnspiel.php'; ?>
    <section id="masud">
        <div class="container">
            <h2>
                MASUD
            </h2>
            <div class="text">
                <p>Comedian Masud präsentiert dir jede Woche das abgefahrenste Zeug aus den Untiefen des Internets. Der smarte Bro feuert dabei mehr unerlaubte Sprüche raus als Kim-Jong Raketen und zeigt mehr Nieten als ne Losbude. Ab 28. August heißt es also: Schalte dich rein, denn wer zu Web lacht, lacht am besten!</p>
            </div>
            <div class="masud_img">
                <img src="images/masud_show.png" title="masud" alt="masud">
            </div>
        </div>
    </section>

    <?php require_once __DIR__ . '/page_elements/footer.php'; ?>
</div><!-- #page -->
<?php require_once __DIR__ . '/page_elements/javascript.php'; ?>
<?php require_once __DIR__ . '/page_elements/kobra_javascript.php'; ?>

</body>
</html>
