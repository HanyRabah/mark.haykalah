<?php
// $secret = "your-github-webhook-secret"; // Optional security measure
// $payload = file_get_contents("php://input");
// $hash = "sha256=" . hash_hmac("sha256", $payload, $secret);

// if (!hash_equals($hash, $_SERVER["HTTP_X_HUB_SIGNATURE_256"])) {
//     http_response_code(403);
//     die("Invalid signature");
// }

file_put_contents("/home4/haykalah/mark.haykalah.com/deploy.log", date("Y-m-d H:i:s") . " - Webhook received\n", FILE_APPEND);
shell_exec("bash /home4/haykalah/mark.haykalah.com/deploy.sh >> /home4/haykalah/mark.haykalah.com/deploy.log 2>&1 &");

echo "Deployment triggered!";
?>
