<?php

// Этот скрипт должен быть доступен по URL https://yourdomain.com/deploy.php

$secret = '1550444q1Q'; // секретный ключ, который вы установили в настройках веб-хука GitHub

// Проверка секретного ключа
if ($_SERVER['HTTP_X_HUB_SIGNATURE'] === 'sha1='.hash_hmac('sha1', file_get_contents('php://input'), $secret)) {
    // Выполнение скрипта
    shell_exec('bash deploy.sh');
    echo 'Deploy script executed successfully.';
} else {
    header('HTTP/1.0 403 Forbidden');
    echo 'Invalid secret key.';
}
