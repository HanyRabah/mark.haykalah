<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Identify which form was submitted
    $form_type = isset($_POST['form_type']) ? $_POST['form_type'] : '';

    if ($form_type == 'contact_form' || $form_type == 'contact_form_ar') {
        // Process Contact Form (English or Arabic)
        $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
        $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        // Handle checkboxes for subject selection
        $subject = isset($_POST['subject']) ? (is_array($_POST['subject']) ? implode(", ", $_POST['subject']) : $_POST['subject']) : 'No Subject';

        // Validate required fields
        if (empty($first_name) || empty($last_name)) {
            die("Error: First name or last name is missing.");
        }

        // Prepare item name
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

    } elseif ($form_type == 'package_form_ar' || $form_type == 'package_form_en') {
        // Process Package Selection Form (Arabic or English)
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $package = isset($_POST['package']) ? trim($_POST['package']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        // Validate required fields
        if (empty($name) || empty($email) || empty($phone) || empty($package)) {
            die("Error: All fields are required.");
        }
        $item_name = $name;

        // Prepare column values for Monday.com
        $column_values = [
            "short_text_name" => $name,
            'email_mkka74q8' => [
                'email' => $email,
                'text' => $email
            ],
            'short_text_phone' => $phone,
            "short_text_package" => $package,
            'long_text_message' => $message
        ];
    } else {
        die("Error: Invalid form submission.");
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

    // API Key for Monday.com
    $api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0ODQ3OTMwNiwiYWFpIjoxMSwidWlkIjo2OTU1MzgzNywiaWFkIjoiMjAyNC0xMi0xNlQwOTo1ODozMC4zODlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY4ODEwMzUsInJnbiI6ImV1YzEifQ.XNIa79hgxMKfmEjc-eXDYJswRKggz-ItIT35KLnrWqI';

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


<!-- new code  -->

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $form_type = isset($_POST['form_type']) ? $_POST['form_type'] : '';

    // Sanitize input function
    function sanitizeInput($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    if ($form_type == 'package_form_ar' || $form_type == 'package_form_en') {
        // Sanitize inputs
        $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
        $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
        $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
        $package = isset($_POST['package']) ? sanitizeInput($_POST['package']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';

        // Validate required fields
        if (empty($name) || empty($email) || empty($phone) || empty($package) || empty($message)) {
            echo json_encode(["status" => "error", "message" => "All fields are required."]);
            exit;
        }

        // Prepare column values for Monday.com
        $column_values = [
            "short_text_name" => $name,
            'email_mkka74q8' => ['email' => $email, 'text' => $email],
            'short_text_phone' => $phone,
            "short_text_package" => $package,
            'long_text_message' => $message
        ];

        // Prepare GraphQL query for Monday.com
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

        $api_key = 'YOUR_MONDAY_API_KEY_HERE';
        $response = sendToMondayAPI($query, $api_key);
        $response_data = json_decode($response, true);

        if (isset($response_data['data']['create_item'])) {
            echo json_encode(["status" => "success", "message" => "Your request has been submitted successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Submission failed. Please try again."]);
        }
        exit;
    }
}

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
    curl_close($ch);
    return $response;
}
?>
