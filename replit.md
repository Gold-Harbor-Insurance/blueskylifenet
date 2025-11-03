# BlueSky Life Landing Pages

## Overview
Three high-converting quiz-style landing pages for BlueSky Life - one for seniors, one for veterans, and one for first responders. All pages guide users through a multi-step eligibility questionnaire with IP-based ZIP code auto-detection and culminate in a thank you page with a countdown timer and phone call CTA.

## Project Structure

### Pages
- `/seniors` - Landing page for seniors with 16-step quiz (15 questions + thank you)
- `/veterans` - Landing page for veterans with 17-step quiz (military branch + 15 questions + thank you)
- `/firstresponders` - Landing page for first responders with 17-step quiz (agency + 15 questions + thank you)
- `/` - Main homepage replicating blueskylife.com design
- `/not-qualified` - Legacy disqualification page (no longer used - all ages accepted)

### Quiz Flow Architecture (November 2025 Update)

**Seniors Landing Page** (/seniors) - 16 Steps Total:
- **Q1**: ZIP Code (auto-detected via IP geolocation, editable)
- **Q2**: Gender
- **Q3**: Has Life Insurance
- **Q4**: Cash Amount Available
- **Q5**: Beneficiary
- **Q6**: Age Range (ALL ages now accepted - no disqualification)
- **Q7**: Beneficiary Name
- **Q8**: Hobby
- **Q9**: First Name
- **Q10**: Last Name
- **Q11**: Email
- **Q12**: Phone
- **Q13**: Street Address (with disabled city/state/ZIP fields pre-filled from Q1)
- **Q14**: County (input with autocomplete suggestions based on state from Q1)
- **Q15**: Monthly Budget (triggers Ringba API before proceeding)
- **Step 16**: Thank you page (integrated as final step)

**Veterans Landing Page** (/veterans) - 17 Steps Total:
- **Q1**: Military Branch (Army, Marine Corps, Navy, Air Force, Coast Guard, Space Force)
- **Q2**: ZIP Code (auto-detected via IP geolocation, editable)
- **Q3**: Gender
- **Q4**: Has Life Insurance
- **Q5**: Cash Amount Available
- **Q6**: Beneficiary
- **Q7**: Age Range (ALL ages now accepted)
- **Q8**: Beneficiary Name
- **Q9**: Hobby
- **Q10**: First Name
- **Q11**: Last Name
- **Q12**: Email
- **Q13**: Phone
- **Q14**: Street Address (with disabled city/state/ZIP fields pre-filled from Q2)
- **Q15**: County (input with autocomplete suggestions based on state from Q2)
- **Q16**: Monthly Budget (triggers Ringba API before proceeding)
- **Step 17**: Thank you page (integrated as final step)

**First Responders Landing Page** (/firstresponders) - 17 Steps Total:
- **Q1**: First Responder Agency (Law enforcement, Fire and rescue, Emergency Medical Services, Public safety communications, Other critical first responders)
- **Q2**: ZIP Code (auto-detected via IP geolocation, editable)
- **Q3**: Gender
- **Q4**: Has Life Insurance
- **Q5**: Cash Amount Available
- **Q6**: Beneficiary
- **Q7**: Age Range (ALL ages now accepted)
- **Q8**: Beneficiary Name
- **Q9**: Hobby
- **Q10**: First Name
- **Q11**: Last Name
- **Q12**: Email
- **Q13**: Phone
- **Q14**: Street Address (with disabled city/state/ZIP fields pre-filled from Q2)
- **Q15**: County (input with autocomplete suggestions based on state from Q2)
- **Q16**: Monthly Budget (triggers Ringba API before proceeding)
- **Step 17**: Thank you page (integrated as final step)

### Features Implemented

1. **IP Geolocation Auto-Detection** (November 2025)
   - Automatically detects user's ZIP code, city, and state on page load
   - Uses ipapi.co API for IP-based geolocation
   - Pre-fills ZIP code field on first question
   - User can edit the auto-detected ZIP code
   - Validates and updates city/state using Zippopotam.us API when ZIP is changed
   - **Files**: client/src/utils/ipGeolocation.ts, client/src/utils/zipCodeLookup.ts

2. **County Selection with Manual Entry Fallback** (November 2025)
   - Comprehensive county database covering all 50 US states, DC, and Puerto Rico
   - 3,243+ counties organized by state
   - Uses Input field with datalist for autocomplete suggestions
   - Allows manual typing when county lookup fails or user wants to enter custom value
   - Shows "Select or type your county" when counties available, "Type your county" when list empty
   - **Files**: client/src/utils/countyData.ts

3. **Thank You Page Integration**
   - Congratulations message
   - 142-second countdown timer (2:22) with pulse animation
   - Dynamic phone number from Ringba API (fallback: (877) 790-1817) with click-to-call
   - Custom Ringba API integration via POST to https://display.ringba.com/v2/nis/gn/
   - Facebook tracking data forwarded to Ringba (fbclid, fbc, fbp)
   - Urgency messaging
   - Legal disclaimers and footer
   - **Architecture**: Thank you content is rendered as the final step of the quiz flow on the same page/URL
     - Prevents users from bypassing quiz by directly accessing /thank-you
     - Ensures all tracking variables remain in DOM for GTM
     - Maintains form data persistence throughout flow
     - Displays loading indicator while Ringba API call is in progress

4. **Google Tag Manager Integration** (November 2025 Update)
   - BlueSky Life GTM container: `https://trk.blueskylife.io`
   - Container ID: GTM-W9243JWT
   - All quiz selections captured in hidden input fields for GTM access
   - **All templates** hidden inputs:
     - `name="gender"` - Selected gender
     - `name="life_insurance"` - Life insurance status
     - `name="coverage_amount"` - Cash amount available
     - `name="beneficiary"` - Selected beneficiary
     - `name="age_classification"` - Selected age range
     - `name="beneficiary_name"` - Beneficiary name
     - `name="hobby"` - User's hobby
     - `name="first_name"` - First name
     - `name="last_name"` - Last name
     - `name="zip_code"` - ZIP code
     - `name="email"` - Email address
     - `name="phone"` - Phone number
     - `name="street_address"` - Street address
     - `name="city"` - City (auto-filled from ZIP)
     - `name="state"` - State (auto-filled from ZIP)
     - `name="county"` - Selected county
     - `name="monthly_budget"` - Selected monthly budget
   - **Veterans template** additional input:
     - `name="military_branch"` - Selected military branch
   - **First Responders template** additional input:
     - `name="first_responder_agency"` - Selected first responder agency
   - Hidden inputs ALWAYS rendered in DOM throughout quiz flow for GTM to read
   - GTM can access values via: `document.querySelector('input[name="field_name"]').value`
   - Additional tracking: data attributes on call button (data-age-classification, data-budget-classification)

5. **Facebook Tracking Integration**
   - Captures Facebook click ID (fbclid) from URL parameters
   - Stores Facebook browser cookie (_fbc) and pixel ID (_fbp)
   - Passes tracking data to Ringba for CAPI integration
   - Data flows: Website → Ringba → Make → Facebook CAPI
   - Enables Facebook ad optimization through conversion tracking

6. **Age Qualification Logic Update** (November 2025)
   - **CRITICAL CHANGE**: ALL ages now accepted - no disqualification
   - Age buttons: "Under 45", "45-85", "Over 85"
   - All age ranges proceed through quiz without redirecting to /not-qualified
   - Age data still captured for tracking and analytics purposes

7. **Custom Ringba API Integration** (October 2025)
   - Replaced Ringba script tag with custom API implementation
   - **API Endpoint**: POST to https://display.ringba.com/v2/nis/gn/
   - **JsTagId**: JSfa2731f06cb04b478e94abc2f4b6610c
   - **Timing**: API called after monthly budget selection (Q15/Q16), before displaying thank you step
   - **Loading State**: Full-screen overlay with semi-transparent backdrop and centered loading card
     - Fixed position overlay covering entire viewport (`fixed inset-0`)
     - Semi-transparent black background with backdrop blur (`bg-black/50 backdrop-blur-sm`)
     - White centered card with spinner, heading, and subtext
     - Accessibility: `role="status"` and `aria-live="polite"` for screen reader support
     - Spinner marked `aria-hidden="true"` as decorative element
     - **IMPORTANT**: Hidden inputs remain in DOM during loading screen for Ringba API to access
   - **Data Collection**:
     - All hidden input field values (17 form fields)
     - URL parameters (fbclid, gclid, utm_campaign, etc.) - captured automatically
     - Facebook cookies (_fbc, _fbp) - read automatically from browser
     - Location properties (completeUrl, hostName, pathName, hash)
   - **Response Handling**:
     - Dynamic phone number from API response
     - Auto-formats to (xxx) xxx-xxxx display format
     - Tel link format: tel:+1XXXXXXXXXX (automatically prepends +1 for 10-digit US numbers)
   - **Fallback**: If API fails, uses (877) 790-1817 as default number
   - **Files**: client/src/utils/ringbaApi.ts contains the implementation

8. **Facebook In-App Browser Fix** (October 2025)
   - Facebook/Instagram WebView detection to fix unclickable call button
   - Browser detection via user agent (FBAN/FBAV/Instagram)
   - For Facebook browsers: Uses plain `<a>` tag with `window.location.href` fallback
   - For regular browsers: Uses Framer Motion animated button
   - Prevents tel: link blocking in Facebook/Instagram in-app browsers
   - **Files**: client/src/components/ThankYouContent.tsx contains the implementation

9. **Webhook Integration for Form Submissions** (November 2025)
   - Automatically sends all form data to Make.com webhook upon survey completion
   - **Endpoint**: https://hook.us1.make.com/7zxkh8rclxevlmsdxgjayu5tq2dtoab5
   - Triggered after monthly budget selection, alongside Ringba API call
   - **Payload includes**:
     - All 17 form fields with standardized `underscore_case` naming
     - `landing_page` identifier (seniors/veterans/first_responders)
     - `submitted_at` ISO timestamp
   - Field naming convention (all use underscore_case):
     - `life_insurance` (not has_life_insurance)
     - `coverage_amount` (not cash_amount)
     - `military_branch` (veterans only)
     - `first_responder_agency` (first responders only)
   - Non-blocking: Webhook errors don't prevent user from seeing thank you page
   - **Files**: client/src/utils/webhookApi.ts

### Design System
- **Brand Colors**: BlueSky Life green (#5CB85C) with gradient backgrounds
- **Typography**: Inter for headings/body, Space Mono for countdown timer
- **Components**: Card-based quiz interface with smooth animations
- **Responsive**: Mobile-first design with optimized touch targets
- **Animations**: Framer Motion for smooth transitions between questions

### Tech Stack
- React + TypeScript
- Wouter (routing)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Shadcn UI (components)
- Zod (validation schemas)

## Development Notes
- No backend/database needed - client-side only quiz flow
- All form data validated with Zod schemas
- Progressive disclosure: one question at a time to maximize completion
- Countdown timer runs for 142 seconds (2:22) on thank you page
- Phone number has tel: link for mobile click-to-call functionality
- Thank you page is integrated as the final step of quiz (not a separate route) to maintain tracking data availability for GTM
- **ZIP Auto-Detection**: Uses IP geolocation on component mount to pre-fill location data
- **Address Pre-Fill**: City, state, and ZIP are shown as disabled fields in street address question

### Base Path Handling (Dev vs Production)
**Issue**: vite.config.ts has `base: "/final-expense/rb-dhF5ke48DSslf/"` for cPanel deployment, which broke Replit preview

**Solution**: 
- **Client-side (App.tsx)**: Uses `import.meta.env.DEV` to determine wouter Router base path
  - Dev: "" (empty) so routes match at root `/`
  - Prod: `import.meta.env.BASE_URL` from vite.config.ts
- **Server-side (server/index.ts)**: Dynamically imports base from viteConfig
  - Dev: Middleware strips vite base path from asset requests before Vite processes them
  - Prod: Serves static files under vite base path with SPA fallback

This ensures Replit preview works while production builds deploy correctly to cPanel subdirectory. Any changes to vite.config.ts base are automatically reflected throughout the app.
