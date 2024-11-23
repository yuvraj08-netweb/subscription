# Subscription Payment Integration

This project demonstrates the integration of Stripe's payment gateway for both one-time payments and subscription-based billing. The application is designed to provide a smooth and secure checkout experience for users, leveraging Stripe's robust features.

## Features

- **Product Listings:** A dynamic list of products with options for one-time purchases.
- **Subscription Plans:** Support for recurring payments with customizable subscription plans.
- **Secure Payments:** Integration with Stripe for safe and reliable payment processing.
- **Customer Portal:** Direct access to Stripe's customer portal for subscription management.
- **Redirects:** Configured post-payment redirects for seamless user navigation.

## Prerequisites

To run this project, you need:

- Node.js (v14 or higher) and npm installed.
- A Stripe account with API keys (publishable and secret keys).
- A web server or local development server.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yuvraj08-netweb/subscription.git
   cd subscription
   ```
2. **Install dependencies:**
    ```bash
     npm install
    ```
3. **Configure environment variables:**
   Create a .env file in the root directory and add your Stripe API keys:
   ```bash
    NEXT_PUBLIC_API_URL = "your api url to make api calls"
   ```
4. Run the development server:
   ```bash
   npm start
   ```
   Open your browser and navigate to http://localhost:3000.
   
## Usage

1. **One-Time Payments:**

  - Browse the product list.
  - Click the "Buy Now" button to initiate a one-time payment.
  - Complete the transaction on Stripe's hosted payment page.
  
2. **Subscriptions:**

  - Select a subscription plan.
  - Proceed to Stripe's checkout page to set up recurring billing.
  - Manage subscriptions through the customer portal.

## Key Technologies
  - **Frontend:** React.js
  - **Backend:** Node.js
  - **Payments:** Stripe AP

## Additional Notes
  - The project includes pre-configured redirects to handle success and cancellation scenarios.
  - Ensure your Stripe account is in live mode before deploying to production.

## Support
  For any issues or questions, please feel free to create an issue in the repository or contact the maintainer.
