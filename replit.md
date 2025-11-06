# BlueSky Life Landing Pages

## Overview
This project develops three high-converting, quiz-style landing pages for BlueSky Life, targeting seniors, veterans, and first responders. The core purpose is to guide users through a multi-step eligibility questionnaire with features like IP-based ZIP code auto-detection, culminating in a thank you page with a countdown timer and a phone call to action (CTA). The project aims to optimize conversion rates for lead generation.

## User Preferences
I prefer iterative development with a focus on clear, concise explanations. Please ask for my approval before implementing any major architectural changes or significant feature modifications. I value a clean and well-structured codebase.

## System Architecture
The application is a client-side only quiz flow with no dedicated backend or database. It utilizes a card-based UI with smooth Framer Motion animations for transitions between questions, ensuring a responsive, mobile-first design. Key architectural decisions include:

-   **Dual Quiz Flow Architecture**: Two separate question flows optimized for different traffic sources:
    -   **Streamlined Flow** (`/final-expense/rb-f3q8n1z7rp0x/`): 6-7 steps with Gender, Coverage Amount, and Monthly Budget removed to reduce friction
    -   **Comprehensive Flow** (`/final-expense/nsbrk/`): 9-10 steps including Coverage Amount and Monthly Budget questions for NewsBreak traffic requiring more detailed qualification
-   **Dynamic Content Integration**: Thank you page content, including countdown timer and dynamic phone number, is integrated as the final step of the quiz flow on the same URL to maintain tracking data and prevent direct access.
-   **Tracking & Analytics**: Extensive Google Tag Manager (GTM) and Facebook tracking integration is achieved by capturing all quiz selections in hidden input fields and passing data to Ringba and a Make.com webhook.
-   **Custom Ringba API Integration**: Replaced the standard Ringba script with a custom API implementation for greater control over data collection, loading states, and dynamic phone number retrieval. This call is triggered at the contact info submission.
-   **Webhook Integration**: All form data, along with tracking information and user IP, is automatically sent to a Make.com webhook upon contact info submission.
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
    -   Domain ("lp" field): `blueskylife.io`
-   **Automation & Webhooks**:
    -   `Make.com`: Endpoint (`https://hook.us1.make.com/7zxkh8rclxevlmsdxgjayu5tq2dtoab5`) for receiving all form submission data.
-   **Marketing & Analytics**:
    -   `Google Tag Manager (GTM)`: For comprehensive event tracking and data layer management (`GTM-W9243JWT`, `https://trk.blueskylife.io`).
    -   `Facebook Pixel/CAPI`: For ad optimization and conversion tracking via data passed to Ringba and Make.com.

## Current Question Flows (December 2025)

### Streamlined Flow (`/final-expense/rb-f3q8n1z7rp0x/`)
**Seniors** (6 steps total):
1. Beneficiary
2. Life Insurance
3. Age
4. Beneficiary Name
5. Contact Info
6. Thank You

**Veterans** (7 steps total):
1. Military Branch
2. Beneficiary
3. Life Insurance
4. Age
5. Beneficiary Name
6. Contact Info
7. Thank You

**First Responders** (7 steps total):
1. First Responder Agency
2. Beneficiary
3. Life Insurance
4. Age
5. Beneficiary Name
6. Contact Info
7. Thank You

### Comprehensive Flow - NewsBreak (`/final-expense/nsbrk/`)
**Seniors** (9 steps total):
1. Beneficiary
2. Life Insurance
3. Age
4. Beneficiary Name
5. Coverage Amount
6. Monthly Budget
7. Beneficiary Name
8. Contact Info
9. Thank You

**Veterans** (10 steps total):
1. Military Branch
2. Beneficiary
3. Life Insurance
4. Age
5. Beneficiary Name
6. Coverage Amount
7. Monthly Budget
8. Beneficiary Name
9. Contact Info
10. Thank You

**First Responders** (10 steps total):
1. First Responder Agency
2. Beneficiary
3. Life Insurance
4. Age
5. Beneficiary Name
6. Coverage Amount
7. Monthly Budget
8. Beneficiary Name
9. Contact Info
10. Thank You

## Value Mappings (December 2025)
Button display text → Values sent to Ringba & Webhook:

-   **Beneficiary** (`beneficiary`):
    - "Spouse" → "Spouse"
    - "Children" → "Children"
    - "Grandchildren" → "Grandchildren"
    - "Family Member" → "Family"

-   **Military Branch** (`military_branch` - Veterans only):
    - "Army" → "Army"
    - "Marines" → "Marine Corps"
    - "Navy" → "Navy"
    - "Air Force" → "Air Force"
    - "Coast Guard" → "Coast Guard"

-   **First Responder Agency** (`first_responder_agency` - First Responders only):
    - "Law Enforcement" → "Law enforcement"
    - "Fire Services" → "Fire and rescue"
    - "EMS" → "Emergency Medical Services"
    - "Public Safety Communications" → "Public safety communications"
    - "Other" → "Other critical first responders"

-   **Coverage Amount** (`coverage_amount` - NewsBreak flow only):
    - "Under $10,000" → "Under$10000"
    - "$10,000 – $24,999" → "$10000-$24999"
    - "$25,000 – $50,000" → "$25000-$50000"
    - "Over $50,000" → "Over$50000"

-   **Monthly Budget** (`monthly_budget` - NewsBreak flow only):
    - "Under $50" → "Under$50"
    - "$50 – $74" → "$50–$74"
    - "$75 – $99" → "$75–$99"
    - "$100 – $149" → "$100–$149"
    - "Over $150" → "Over$150"

## Removed Questions (December 2025)
The following questions were removed from the **streamlined flow** (`/final-expense/rb-f3q8n1z7rp0x/`) to reduce friction:
-   Gender
-   Coverage Amount
-   Monthly Budget

**Note**: The **comprehensive flow** (`/final-expense/nsbrk/`) includes Coverage Amount and Monthly Budget questions to better qualify NewsBreak traffic.