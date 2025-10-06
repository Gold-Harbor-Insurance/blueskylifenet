# Gold Harbor Insurance Landing Pages

## Overview
Two high-converting quiz-style landing pages for Gold Harbor Insurance - one for seniors and one for veterans. Both pages guide users through a multi-step eligibility questionnaire and culminate in a thank you page with a countdown timer and phone call CTA.

## Project Structure

### Pages
- `/seniors` - Landing page for seniors with 5-step quiz
- `/veterans` - Landing page for veterans with 6-step quiz (includes military branch question)
- `/thank-you` - Conversion page with countdown timer and phone number CTA
- `/` - Defaults to seniors landing page

### Features Implemented
1. **Veterans Landing Page** (/veterans)
   - Military branch selection (Army, Marine Corps, Navy, Air Force, Coast Guard, Space Force)
   - State selection dropdown (all 50 US states)
   - Age range selection (Under 45, 45-85, Over 85)
   - Beneficiary selection (Spouse, Children, Grandchildren, Family Member)
   - Coverage amount selection ($0-$10k, $10k-$25k, $25k-$50k, $50k+)
   - Monthly budget selection (5 tiers from <$50 to $150+)

2. **Seniors Landing Page** (/seniors)
   - Same questions as veterans except no military branch question
   - 5-step quiz flow instead of 6

3. **Thank You Page** (/thank-you)
   - Congratulations message
   - 45-second countdown timer with pulse animation
   - Prominent phone number: (877) 745-7526 with click-to-call
   - Urgency messaging
   - Legal disclaimers and footer

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
- Countdown timer runs for 45 seconds on thank you page
- Phone number has tel: link for mobile click-to-call functionality
