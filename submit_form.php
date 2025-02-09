<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Capture form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    // Prepare the column_values in JSON format
    $column_values = [
        "first_name" => $first_name,  
        "last_name" => $first_name,  
        'email_mkka74q8' => [
            'email' => $email,  
            'text' => $email     
        ],
        'short_text_mkkagy8h'=> $phone,
        "short_text_subject" => $subject,
        'long_text_mkkapyz7' => $message
    ];

    // Prepare the GraphQL query for creating an item
    $query = '
        mutation {
            create_item(
                board_id: 1743837969,
                group_id: "new_group_mkk9xdev", 
                item_name: "' . addslashes($name) . '", 
                column_values: "' . addslashes(json_encode($column_values)) . '"
            ) {
                id
            }
        }
    ';

    // API Key for Monday.com (Replace with your actual API key)
    $api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0ODQ3OTMwNiwiYWFpIjoxMSwidWlkIjo2OTU1MzgzNywiaWFkIjoiMjAyNC0xMi0xNlQwOTo1ODozMC4zODlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY4ODEwMzUsInJnbiI6ImV1YzEifQ.XNIa79hgxMKfmEjc-eXDYJswRKggz-ItIT35KLnrWqI';

    // Send the request to Monday.com API using cURL
    $response = sendToMondayAPI($query, $api_key);

    // Decode the response to handle it
    $response_data = json_decode($response, true);

    // Check if the response contains data
    if (isset($response_data['data']['create_item'])) {
        echo "Item created successfully! ID: " . $response_data['data']['create_item']['id'];
    } else {
        echo "Error: " . $response_data['errors'][0]['message'];
    }
}

// Function to send the GraphQL query to the Monday.com API
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

    // Initialize cURL session and execute the request
    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);

    // Check for cURL errors
    if(curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

    // Close cURL session
    curl_close($ch);

    return $response;
}
?>
