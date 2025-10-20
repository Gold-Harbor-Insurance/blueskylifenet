# Gold Harbor Insurance Landing Pages

## Overview
Three high-converting quiz-style landing pages for Gold Harbor Insurance - one for seniors, one for veterans, and one for first responders. All pages guide users through a multi-step eligibility questionnaire and culminate in a thank you page with a countdown timer and phone call CTA.

## Project Structure

### Pages
- `/seniors` - Landing page for seniors with 6-step quiz (step 6 = thank you)
- `/veterans` - Landing page for veterans with 7-step quiz (step 7 = thank you, includes military branch question)
- `/firstresponders` - Landing page for first responders with 7-step quiz (step 7 = thank you, includes agency question)
- `/thank-you` - Legacy route (no longer used - redirects to seniors)
- `/not-qualified` - Disqualification page for users who don't meet age criteria
- `/` - Defaults to seniors landing page

### Features Implemented
1. **Veterans Landing Page** (/veterans)
   - 7-step quiz flow with thank you as final step
   - Military branch selection (Army, Marine Corps, Navy, Air Force, Coast Guard, Space Force)
   - State selection dropdown (all 50 US states)
   - Age range selection (Under 45, 45-85, Over 85)
   - Beneficiary selection (Spouse, Children, Grandchildren, Family Member)
   - Coverage amount selection ($0-$10k, $10k-$25k, $25k-$50k, $50k+)
   - Monthly budget selection (5 tiers from <$50 to $150+)
   - **Step 7**: Thank you page integrated as final quiz step (not separate route)

2. **Seniors Landing Page** (/seniors)
   - 6-step quiz flow with thank you as final step
   - Same questions as veterans except no military branch question
   - State selection dropdown (all 50 US states)
   - Age range selection (Under 45, 45-85, Over 85)
   - Beneficiary selection (Spouse, Children, Grandchildren, Family Member)
   - Coverage amount selection ($0-$10k, $10k-$25k, $25k-$50k, $50k+)
   - Monthly budget selection (5 tiers from <$50 to $150+)
   - **Step 6**: Thank you page integrated as final quiz step (not separate route)

3. **First Responders Landing Page** (/firstresponders)
   - 7-step quiz flow with thank you as final step
   - Agency selection (Law enforcement, Fire and rescue, Emergency Medical Services, Public safety communications, Other critical first responders)
   - State selection dropdown (all 50 US states)
   - Age range selection (Under 45, 45-85, Over 85)
   - Beneficiary selection (Spouse, Children, Grandchildren, Family Member)
   - Coverage amount selection ($0-$10k, $10k-$25k, $25k-$50k, $50k+)
   - Monthly budget selection (5 tiers from <$50 to $150+)
   - **Step 7**: Thank you page integrated as final quiz step (not separate route)

4. **Thank You Page Integration** (embedded in quiz, not separate route)
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

5. **Facebook Tracking Integration**
   - Captures Facebook click ID (fbclid) from URL parameters
   - Stores Facebook browser cookie (_fbc) and pixel ID (_fbp)
   - Passes tracking data to Ringba for CAPI integration
   - Data flows: Website → Ringba → Make → Facebook CAPI
   - Enables Facebook ad optimization through conversion tracking

6. **GTM Data Layer Integration**
   - All quiz selections captured in hidden input fields with specific names for GTM access
   - **Veterans template** hidden inputs:
     - `name="military_branch"` - Selected military branch
     - `name="state"` - Selected US state
     - `name="age_classification"` - Selected age range
     - `name="beneficiary"` - Selected beneficiary
     - `name="coverage_amount"` - Selected coverage amount
     - `name="monthly_budget"` - Selected monthly budget
   - **First Responders template** hidden inputs:
     - `name="first_responder_agency"` - Selected first responder agency
     - `name="state"` - Selected US state
     - `name="age_classification"` - Selected age range
     - `name="beneficiary"` - Selected beneficiary
     - `name="coverage_amount"` - Selected coverage amount
     - `name="monthly_budget"` - Selected monthly budget
   - **Seniors template** hidden inputs (same except no military_branch or agency):
     - `name="age_classification"` - Selected age range
     - `name="state"` - Selected US state
     - `name="beneficiary"` - Selected beneficiary
     - `name="coverage_amount"` - Selected coverage amount
     - `name="monthly_budget"` - Selected monthly budget
   - Hidden inputs persist in DOM throughout quiz flow for GTM to read
   - GTM can access values via: `document.querySelector('input[name="field_name"]').value`
   - Additional tracking: data attributes on call button (data-age-classification, data-budget-classification)
   - High-quality click tracking: Age 45-85 AND budget above $50/month

7. **Age-Based Qualification Logic**
   - Age buttons: "Under 45", "45-85", "Over 85"
   - Users 45 and under (Under 45) are disqualified
   - Users over 85 (Over 85) are disqualified
   - Qualified users: 45-85 age range
   - Disqualified users are redirected to /not-qualified page
   - Applies to all landing pages (seniors, veterans, first responders)

8. **Custom Ringba API Integration** (October 2025)
   - Replaced Ringba script tag with custom API implementation
   - **API Endpoint**: POST to https://display.ringba.com/v2/nis/gn/
   - **JsTagId**: JSfa2731f06cb04b478e94abc2f4b6610c
   - **Timing**: API called after budget selection, before displaying thank you step
   - **Loading State**: Full-screen overlay with semi-transparent backdrop and centered loading card
     - Fixed position overlay covering entire viewport (`fixed inset-0`)
     - Semi-transparent black background with backdrop blur (`bg-black/50 backdrop-blur-sm`)
     - White centered card with spinner, heading, and subtext
     - Accessibility: `role="status"` and `aria-live="polite"` for screen reader support
     - Spinner marked `aria-hidden="true"` as decorative element
   - **Data Sent as Ringba Tags**:
     - All hidden input field values (quiz selections)
     - URL parameters (fbclid, utm_campaign, etc.)
     - Facebook cookies (_fbc, _fbp)
     - Location properties (completeUrl, hostName, pathName, hash)
   - **Response Handling**:
     - Dynamic phone number from API response
     - Auto-formats to (xxx) xxx-xxxx display format
     - Tel link format: tel:+1XXXXXXXXXX (automatically prepends +1 for 10-digit US numbers)
   - **Fallback**: If API fails, uses (877) 790-1817 as default number
   - **Files**: client/src/utils/ringbaApi.ts contains the implementation

9. **Facebook In-App Browser Fix** (October 2025)
   - Facebook/Instagram WebView detection to fix unclickable call button
   - Browser detection via user agent (FBAN/FBAV/Instagram)
   - For Facebook browsers: Uses plain `<a>` tag with `window.location.href` fallback
   - For regular browsers: Uses Framer Motion animated button
   - Prevents tel: link blocking in Facebook/Instagram in-app browsers
   - **Files**: client/src/components/ThankYouContent.tsx contains the implementation

### Design System
- **Brand Colors**: Gold Harbor Insurance gold (#D4AF37) with deep navy gradient background
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
