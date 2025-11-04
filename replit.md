# BlueSky Life Landing Pages

## Overview
This project develops three high-converting, quiz-style landing pages for BlueSky Life, targeting seniors, veterans, and first responders. The core purpose is to guide users through a multi-step eligibility questionnaire with features like IP-based ZIP code auto-detection, culminating in a thank you page with a countdown timer and a phone call to action (CTA). The project aims to optimize conversion rates for lead generation.

## User Preferences
I prefer iterative development with a focus on clear, concise explanations. Please ask for my approval before implementing any major architectural changes or significant feature modifications. I value a clean and well-structured codebase.

## System Architecture
The application is a client-side only quiz flow with no dedicated backend or database. It utilizes a card-based UI with smooth Framer Motion animations for transitions between questions, ensuring a responsive, mobile-first design. Key architectural decisions include:

-   **Quiz Flow Optimization**: Critical changes implemented to improve conversion rates, such as moving the monthly budget and beneficiary questions earlier in the flow. All age ranges are now accepted without disqualification.
-   **Dynamic Content Integration**: Thank you page content, including countdown timer and dynamic phone number, is integrated as the final step of the quiz flow on the same URL to maintain tracking data and prevent direct access.
-   **Tracking & Analytics**: Extensive Google Tag Manager (GTM) and Facebook tracking integration is achieved by capturing all quiz selections in hidden input fields and passing data to Ringba and a Make.com webhook.
-   **Custom Ringba API Integration**: Replaced the standard Ringba script with a custom API implementation for greater control over data collection, loading states, and dynamic phone number retrieval. This call is triggered at the final substantive question before the thank you page.
-   **Webhook Integration**: All form data, along with tracking information and user IP, is automatically sent to a Make.com webhook upon survey completion, triggered after the monthly budget selection.
-   **UI/UX**: Brand colors based on BlueSky Life green, Inter and Space Mono typography, and Shadcn UI components.
-   **Progressive Disclosure**: Questions are presented one at a time to maximize completion rates.

### Technology Stack
-   **Frontend**: React, TypeScript, Wouter (routing), Tailwind CSS (styling), Framer Motion (animations), Shadcn UI (components), Zod (validation).

## External Dependencies
-   **Geolocation**:
    -   `ipapi.co`: For IP-based ZIP code, city, and state auto-detection.
    -   `Zippopotam.us`: For validating and updating city/state based on ZIP code changes.
-   **Telephony & Call Tracking**:
    -   `Ringba API`: Custom integration for dynamic phone number generation, call tracking, and forwarding Facebook tracking data.
-   **Automation & Webhooks**:
    -   `Make.com`: Endpoint (`https://hook.us1.make.com/7zxkh8rclxevlmsdxgjayu5tq2dtoab5`) for receiving all form submission data.
-   **Marketing & Analytics**:
    -   `Google Tag Manager (GTM)`: For comprehensive event tracking and data layer management (`GTM-W9243JWT`, `https://trk.blueskylife.io`).
    -   `Facebook Pixel/CAPI`: For ad optimization and conversion tracking via data passed to Ringba and Make.com.