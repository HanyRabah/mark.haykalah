<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Capture form data safely
    $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
    $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Handle checkboxes (Multiple selection handling)
    $subject = isset($_POST['subject']) ? (is_array($_POST['subject']) ? implode(", ", $_POST['subject']) : $_POST['subject']) : 'No Subject';

    // Ensure first and last name are not empty
    if (empty($first_name) || empty($last_name)) {
        die("Error: First name or last name is missing.");
    }

    // Set item name
    $item_name = $first_name . ' ' . $last_name;

    // Prepare column values for Monday.com
    $column_values = [
        "first_name" => $first_name,
        "last_name" => $last_name,
        'email_mkka74q8' => [
            'email' => $email,
            'text' => $email     
        ],
        'short_text_mkkagy8h' => $phone,
        "short_text_subject" => $subject,
        'long_text_mkkapyz7' => $message
    ];

    // Prepare GraphQL query for Monday.com
    $query = '
        mutation {
            create_item(
                board_id: 1743837969,
                group_id: "new_group_mkk9xdev",
                item_name: "' . addslashes($item_name) . '",
                column_values: "' . addslashes(json_encode($column_values)) . '"
            ) {
                id
            }
        }
    ';

    // API Key for Monday.com
    $api_key = 'your_monday_api_key_here';

    // Send request to Monday.com API
    $response = sendToMondayAPI($query, $api_key);
    $response_data = json_decode($response, true);

    // Handle response
    if (isset($response_data['data']['create_item'])) {
        echo "Item created successfully! ID: " . $response_data['data']['create_item']['id'];
    } else {
        echo "Error: " . $response_data['errors'][0]['message'];
    }
}

// Function to send GraphQL query to Monday.com API
function sendToMondayAPI($query, $api_key) {
    $url = "https://api.monday.com/v2";

    // Set up cURL options
    $options = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: ' . $api_key,
        ],
        CURLOPT_POSTFIELDS => json_encode(['query' => $query]),
    ];

    // Execute cURL request
    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);

    // Handle cURL errors
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

    // Close cURL session
    curl_close($ch);

    return $response;
}
?>
