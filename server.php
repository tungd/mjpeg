<?php

set_time_limit(0);

$boundary = 'hello';

header("Content-type: multipart/x-mixed-replace;boundary={$boundary}");

$current = 0;
$frames = 250;

while (true) {
    print "--{$boundary}\n";
    print "Content-type: image/jpeg\n\n";

    ob_clean();
    flush();

    $img = $current % 16 + 1;

    readfile("img/{$img}.jpg");

    $current += 1;
    if ($current > $frames) break;

    usleep(40 * 1000);
}
