<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $response = ['status' => 'error', 'message' => 'Invalid form submission.'];

    // Identify which form was submitted
    $form_type = isset($_POST['form_type']) ? $_POST['form_type'] : '';

    if ($form_type == 'contact_form' || $form_type == 'contact_form_ar') {
        // Process Contact Form (English or Arabic)
        $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
        $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';
        $subject = isset($_POST['subject']) ? (is_array($_POST['subject']) ? implode(", ", $_POST['subject']) : $_POST['subject']) : 'No Subject';

        if (empty($first_name) || empty($last_name)) {
            echo json_encode(['status' => 'error', 'message' => 'First name or last name is missing.']);
            exit;
        }

        $item_name = $first_name . ' ' . $last_name;
        $column_values = [
            "first_name" => $first_name,
            "last_name" => $last_name,
            'email_mkka74q8' => ['email' => $email, 'text' => $email],
            'short_text_mkkagy8h' => $phone,
            "short_text_subject" => $subject,
            'long_text_mkkapyz7' => $message
        ];

    } elseif ($form_type == 'package_form_ar' || $form_type == 'package_form_en') {
        // Process Package Form
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $package = isset($_POST['package']) ? trim($_POST['package']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        if (empty($name) || empty($email) || empty($phone) || empty($package)) {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
            exit;
        }

        $item_name = $name;
        $column_values = [
            "short_text_name" => $name,
            'email_mkka74q8' => ['email' => $email, 'text' => $email],
            'short_text_phone' => $phone,
            "short_text_package" => $package,
            'long_text_message' => $message
        ];
    } elseif ($form_type == 'hajj_quote_form' || $form_type == 'hajj_quote_form_ar') {
        // Handle Hajj Quote Form
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Hajj Quote';
        $lang = $form_type === 'hajj_quote_form_ar' ? 'AR' : 'EN';
    
        if (empty($email) || empty($phone)) {
            echo json_encode(['status' => 'error', 'message' => 'Email or phone number is missing.']);
            exit;
        }
    
        $item_name = 'Hajj Quote - ' . $phone;
        $column_values = [
            'email_mkka74q8' => ['email' => $email, 'text' => $email],
            'short_text_mkkagy8h' => $phone,
            'short_text_subject' => $subject,
            'long_text_mkkapyz7' => "Quote request via Hajj Form ($lang)"
        ];
        } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid form submission.']);
        exit;
    }

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

    // API Key
    $api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0ODQ3OTMwNiwiYWFpIjoxMSwidWlkIjo2OTU1MzgzNywiaWFkIjoiMjAyNC0xMi0xNlQwOTo1ODozMC4zODlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY4ODEwMzUsInJnbiI6ImV1YzEifQ.XNIa79hgxMKfmEjc-eXDYJswRKggz-ItIT35KLnrWqI';

    // Send data to Monday.com
    $response_data = sendToMondayAPI($query, $api_key);
    $decoded_response = json_decode($response_data, true);

    if (isset($decoded_response['data']['create_item'])) {
        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully!', 'item_id' => $decoded_response['data']['create_item']['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'API Error: ' . $decoded_response['errors'][0]['message']]);
    }
}

// Function to send GraphQL request to Monday.com API
function sendToMondayAPI($query, $api_key) {
    $url = "https://api.monday.com/v2";

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

    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(['status' => 'error', 'message' => 'cURL Error: ' . curl_error($ch)]);
        exit;
    }

    curl_close($ch);
    return $response;
}
?>
