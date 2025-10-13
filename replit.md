# Gold Harbor Insurance Landing Pages

## Overview
Two high-converting quiz-style landing pages for Gold Harbor Insurance - one for seniors and one for veterans. Both pages guide users through a multi-step eligibility questionnaire and culminate in a thank you page with a countdown timer and phone call CTA.

## Project Structure

### Pages
- `/seniors` - Landing page for seniors with 6-step quiz (step 6 = thank you)
- `/veterans` - Landing page for veterans with 7-step quiz (step 7 = thank you, includes military branch question)
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

3. **Thank You Page Integration** (embedded in quiz, not separate route)
   - Congratulations message
   - 142-second countdown timer (2:22) with pulse animation
   - Prominent phone number: (877) 790-1817 (fallback) with click-to-call
   - Ringba dynamic number insertion with advanced detection
   - Facebook tracking data forwarded to Ringba (fbclid, fbc, fbp)
   - Urgency messaging
   - Legal disclaimers and footer
   - **Architecture**: Thank you content is rendered as the final step of the quiz flow on the same page/URL
     - Prevents users from bypassing quiz by directly accessing /thank-you
     - Ensures all tracking variables remain in DOM for GTM
     - Maintains form data persistence throughout flow

4. **Facebook Tracking Integration**
   - Captures Facebook click ID (fbclid) from URL parameters
   - Stores Facebook browser cookie (_fbc) and pixel ID (_fbp)
   - Passes tracking data to Ringba for CAPI integration
   - Data flows: Website → Ringba → Make → Facebook CAPI
   - Enables Facebook ad optimization through conversion tracking

5. **GTM Data Layer Integration**
   - All quiz selections captured in hidden input fields with specific names for GTM access
   - **Veterans template** hidden inputs:
     - `name="military_branch"` - Selected military branch
     - `name="state"` - Selected US state
     - `name="age_classification"` - Selected age range
     - `name="beneficiary"` - Selected beneficiary
     - `name="coverage_amount"` - Selected coverage amount
     - `name="monthly_budget"` - Selected monthly budget
   - **Seniors template** hidden inputs (same except no military_branch):
     - `name="age_classification"` - Selected age range
     - `name="state"` - Selected US state
     - `name="beneficiary"` - Selected beneficiary
     - `name="coverage_amount"` - Selected coverage amount
     - `name="monthly_budget"` - Selected monthly budget
   - Hidden inputs persist in DOM throughout quiz flow for GTM to read
   - GTM can access values via: `document.querySelector('input[name="field_name"]').value`
   - Additional tracking: data attributes on call button (data-age-classification, data-budget-classification)
   - High-quality click tracking: Age 45-85 AND budget above $50/month

6. **Age-Based Qualification Logic**
   - Age buttons: "Under 45", "45-85", "Over 85"
   - Users 45 and under (Under 45) are disqualified
   - Users over 85 (Over 85) are disqualified
   - Qualified users: 45-85 age range
   - Disqualified users are redirected to /not-qualified page
   - Applies to both seniors and veterans landing pages

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
