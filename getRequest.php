<?php
        $ch = curl_init("http://10.0.0.41:8080/changeLedInRange?from=1&to=15&red=190&green=80&blue=90&brightness=50");
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_GET, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);       
        curl_close($ch);
        echo $output;
?>


