# Design Guidelines: Gold Harbor Insurance Landing Pages

## Design Approach
**Reference-Based Approach**: Drawing inspiration from high-converting insurance quiz funnels (similar to the reference site), prioritizing conversion optimization, trust-building, and mobile-first interaction patterns.

## Core Design Principles
- **Conversion-Focused**: Every element serves the goal of moving users through the funnel
- **Trust & Credibility**: Professional insurance branding with authoritative presence
- **Mobile-First**: Large touch targets, single-column layouts, thumb-friendly interactions
- **Progressive Disclosure**: One question at a time to reduce cognitive load and increase completion rates

---

## Color Palette

### Primary Colors (Dark Mode)
- **Background**: Deep navy/slate gradient (220 25% 12% to 220 30% 8%)
- **Card Background**: 220 20% 18% with subtle border
- **Primary Brand**: Deep gold/amber (45 85% 50%) - represents Gold Harbor Insurance
- **Text Primary**: 210 10% 98%
- **Text Secondary**: 210 8% 70%

### Accent Colors
- **Success/CTA**: Vibrant blue (210 95% 55%) for main action buttons
- **Urgency**: Warm orange (25 95% 60%) for countdown timer and urgency elements
- **Progress Indicator**: Gold gradient (45 85% 50% to 35 90% 55%)

### Button States
- **Primary CTA**: Blue (210 95% 55%) with hover at 210 95% 50%
- **Option Buttons**: White/transparent with border, active state uses primary blue fill

---

## Typography

### Font Families
- **Headings**: 'Inter', sans-serif (700-800 weight)
- **Body**: 'Inter', sans-serif (400-500 weight)
- **Numbers/Timer**: 'Space Mono', monospace (700 weight)

### Scale & Hierarchy
- **Hero Headline**: text-4xl md:text-5xl lg:text-6xl, font-bold, leading-tight
- **Question Text**: text-2xl md:text-3xl, font-semibold, text-center
- **Button Text**: text-lg md:text-xl, font-medium
- **Helper Text**: text-sm md:text-base, text-secondary
- **Timer**: text-5xl md:text-6xl, font-bold, monospace

---

## Layout System

### Spacing Primitives
- **Core Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, gap-8, mb-12)
- **Section Padding**: py-12 md:py-16 for vertical spacing between major sections
- **Card Padding**: p-6 md:p-8 lg:p-10
- **Button Padding**: px-8 py-4 md:px-10 md:py-5

### Container Structure
- **Max Width**: max-w-2xl for quiz cards (keeps focus tight)
- **Hero Section**: max-w-4xl for headline area
- **Thank You Page**: max-w-3xl centered

---

## Component Library

### Quiz Card Container
- **Background**: Semi-transparent card (backdrop-blur-md) with border
- **Border Radius**: rounded-2xl
- **Shadow**: Subtle glow effect using box-shadow
- **Padding**: p-6 md:p-10
- **Transition**: Smooth fade-in/slide-up animation on question change (300ms ease)

### Question Buttons (Option Selection)
- **Layout**: Grid layout, 2 columns on mobile for short options, 1 column for longer text
- **Size**: Full-width buttons with min-height of 60px for easy tapping
- **Style**: White background with border, hover state with light blue tint
- **Active/Selected**: Solid blue background, white text
- **Spacing**: gap-3 md:gap-4 between buttons
- **Border Radius**: rounded-xl

### State Dropdown
- **Custom Styled**: Large, prominent dropdown (not default browser style)
- **Height**: h-14 md:h-16 for easy mobile interaction
- **Font Size**: text-lg
- **Background**: Dark with light border
- **Hover**: Border color shifts to primary blue

### Progress Indicator
- **Style**: Horizontal progress bar at top of card
- **Visual**: Gold gradient fill showing completion percentage
- **Height**: h-2
- **Animation**: Smooth width transition (500ms ease)
- **Question Counter**: Small text below card ("Question 2/5")

### Primary CTA Button (Phone Number)
- **Size**: Extra large - text-xl md:text-2xl, px-12 py-6
- **Color**: Vibrant blue with white text
- **Icon**: Phone icon positioned before text
- **Hover**: Slight scale up (105%), shadow increase
- **Border Radius**: rounded-full for prominence

### Countdown Timer
- **Display**: Large monospace numbers in circular container
- **Size**: 120px diameter circle on mobile, 160px on desktop
- **Background**: Dark with orange accent border
- **Animation**: Pulse effect on final 10 seconds
- **Position**: Centered above CTA on thank you page

### Headline Section (Top of Page)
- **Layout**: Centered, full-width
- **Announcement Badge**: Small pill-shaped badge above headline ("JUST ANNOUNCED FOR [SENIORS/VETERANS]")
- **Badge Style**: Gold background, dark text, rounded-full, px-6 py-2
- **Headline**: Large, bold, emphasizes benefit amount ($25,000)
- **Subheadline**: Lighter weight, describes the benefit

---

## Page-Specific Elements

### Veterans Version
- **Military Branch Icons**: Use simple, recognizable branch emblems/icons beside each option
- **Color Accent**: Subtle military green or navy touches in progress bar for veteran page only
- **Badge Text**: "JUST ANNOUNCED FOR VETERANS"

### Seniors Version
- **Badge Text**: "JUST ANNOUNCED FOR SENIORS"
- **Imagery**: Softer, family-oriented visual language

### Thank You Page
- **Headline**: Large "Congratulations! There's Availability!" in success green
- **Urgency Section**: Orange background strip with countdown timer
- **CTA Section**: Prominent phone number with tap-to-call functionality
- **Warning Text**: Small, red-tinted text "NOTE: You may never see this message again!"
- **Layout Flow**: Headline → Timer → CTA Button → Urgency Text → Disclaimer

---

## Images

### Hero/Header Area
- **Background**: Subtle gradient overlay, no large hero image (keeps focus on quiz)
- **Optional**: Small trust badges/logos near top (e.g., "Licensed & Insured", "A+ BBB Rating") positioned in header

### Thank You Page
- **No Hero Image**: Focus entirely on conversion elements (timer and phone CTA)

---

## Animations

**Minimal, Purposeful Only:**
- Question transitions: 300ms fade + slight vertical slide
- Progress bar: Smooth 500ms width transition
- Timer countdown: Pulse effect on final 10 seconds only
- Button hover: Subtle scale (102-105%) and shadow enhancement
- Card entrance: Single fade-in on page load

---

## Accessibility & UX

- **Touch Targets**: Minimum 48px height for all interactive elements
- **Contrast**: Maintain WCAG AA standards (4.5:1 for text)
- **Focus States**: Clear blue outline on keyboard navigation
- **Error States**: Red border + inline error message for validation
- **Loading States**: Spinner on navigation between questions
- **Phone Number**: Click-to-call on mobile with tel: link

---

## Responsive Breakpoints

- **Mobile**: Base styles (default)
- **Tablet**: md: breakpoint (768px) - slightly larger text, more padding
- **Desktop**: lg: breakpoint (1024px) - max content width applied, 2-column option layouts where appropriate