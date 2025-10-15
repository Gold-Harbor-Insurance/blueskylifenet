# Gold Harbor Insurance Landing Pages

High-converting quiz-style landing pages for Gold Harbor Insurance with integrated analytics and call tracking.

## 🚀 Live Application

- **Seniors Page**: `/` or `/seniors`
- **Veterans Page**: `/veterans`
- **Thank You Page**: `/thank-you`

## 📋 Features

### Multi-Step Quiz Flow
- **Seniors Quiz** (5 steps): State → Age → Beneficiary → Coverage → Budget
- **Veterans Quiz** (6 steps): Military Branch → State → Age → Beneficiary → Coverage → Budget

### Advanced Functionality
- ✅ **IP-Based Geolocation**: Auto-populates state field using IP address
- ✅ **Accessible State Selector**: Combo box with keyboard navigation, type-to-filter, and large touch targets (44x44px) optimized for seniors
- ✅ **Progress Tracking**: Visual progress bar showing current step
- ✅ **Smooth Animations**: Framer Motion transitions between questions
- ✅ **Countdown Timer**: 45-second urgency timer on thank you page
- ✅ **Click-to-Call**: Mobile-optimized phone number CTA
- ✅ **Legal Compliance**: Privacy Policy and Terms of Use modals (first page only)
- ✅ **Responsive Design**: Mobile-first with tablet/desktop optimization

### Analytics & Tracking
- **Hotjar** (Site ID: 6539672): Session recordings, heatmaps, conversion funnels
- **Ringba**: Dynamic call tracking with number pool integration

### Design System
- **Color Scheme**: 
  - Question 1: Green buttons (#5CB85C) with testimonial carousel
  - Questions 2-5: Blue buttons (#3498DB) with clean layout
- **Typography**: Inter (UI) + Space Mono (countdown timer)
- **Components**: Shadcn UI with custom quiz components
- **Accessibility**: WCAG AA compliant with enhanced features for older adults

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn UI** - Accessible components
- **React Query** - Data fetching (future backend integration)

### Backend (Minimal)
- **Express.js** - API endpoints
- **IP Geolocation API** - State auto-population

### Validation & Types
- **Zod** - Runtime type validation
- **Drizzle ORM** - Type-safe database schema (ready for future use)

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── QuizLayout.tsx   # Main quiz layout wrapper
│   │   │   ├── QuizCard.tsx     # Question card component
│   │   │   ├── OptionButton.tsx # Quiz answer buttons
│   │   │   ├── StateSelector.tsx # Accessible combo box with geolocation
│   │   │   ├── TestimonialCarousel.tsx # Q1 testimonials
│   │   │   ├── CountdownTimer.tsx # Thank you page timer
│   │   │   └── LegalModal.tsx   # Privacy/Terms modal
│   │   ├── pages/
│   │   │   ├── SeniorsLanding.tsx # Seniors quiz (5 steps)
│   │   │   ├── VeteransLanding.tsx # Veterans quiz (6 steps)
│   │   │   └── ThankYou.tsx     # Conversion page
│   │   └── App.tsx              # Router configuration
│   └── index.html               # Tracking scripts integrated here
├── server/
│   ├── routes.ts                # API endpoints (geolocation)
│   └── storage.ts               # In-memory storage (future database)
└── shared/
    └── schema.ts                # Zod schemas and types
```

## 🎯 Key Design Patterns

### Question 1 (Both Pages)
- Large green buttons (60px min-height, text-xl/2xl)
- Testimonial carousel at bottom
- Headline visible above quiz
- Compact layout pushing content higher on screen

### Questions 2-5 (Seniors) / 2-6 (Veterans)
- Blue buttons (#3498DB)
- No testimonials or headline
- Progress bar directly under "Question X/Y"
- Clean, focused design

### Thank You Page
- White background with centered content
- Yellow-highlighted "2-minute call" text
- Red "LIFE INSURANCE BENEFIT!" emphasis
- Green call button with (855) 391-2986
- Countdown timer showing 02:22 (45 seconds total)

### State Selector (All Devices)
- Static label (not placeholder)
- Type-to-filter functionality
- Dropdown for full state list
- District of Columbia and Puerto Rico included
- Special handling for D.C. name variations
- IP-based pre-population (production only)

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

### Environment Variables

No environment variables required for local development. IP geolocation works automatically in production.

## 📊 Analytics Setup

### Hotjar
- Site ID: `6539672`
- Tracking code in `client/index.html`
- Tracks: Session recordings, heatmaps, funnels, polls

### Ringba
- Script ID: `CA0e8a8fb4536b4d7fb188af9d87af8d3a`
- Dynamic number replacement active
- Tracks: Call source, campaign performance, conversions

## 🎨 Customization

### Update Phone Number
Edit `client/src/pages/ThankYou.tsx`:
```tsx
const phoneNumber = "(855) 391-2986"; // Update here
```

### Modify Quiz Questions
Edit schemas in `shared/schema.ts` and update corresponding page components.

### Change Colors
Update Tailwind config in `tailwind.config.ts` and component styles.

## 🔒 Legal & Compliance

### Documents Included
- Privacy Policy (`attached_assets/Privacy_1759787418024.txt`)
- Terms of Use (`attached_assets/Terms_1759787415055.txt`)

### Implementation
- Footer with Privacy/Terms links (first page only)
- Modal popups for full legal text
- Mobile-responsive legal content

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 📱 Accessibility Features

- Minimum 44x44px touch targets
- Keyboard navigation support
- High contrast text (18-20px fonts for seniors)
- Screen reader compatible
- ARIA labels on interactive elements
- `data-testid` attributes for testing

## 🚀 Deployment

### Using Replit
1. Click "Publish" button in Replit
2. Domain will be: `[your-repl-name].replit.app`
3. Custom domain supported via Replit settings

### Manual Deployment
```bash
# Build for production
npm run build

# Output in dist/ folder
# Deploy to any static hosting service
```

## 🔧 Development Notes

### Geolocation Behavior
- **Development**: Returns `null` (localhost has no real IP)
- **Production**: Auto-detects user's state via IP address
- **Fallback**: Users can manually select state

### Error Handling
- Geolocation failures logged to console (non-blocking)
- Invalid state selections prevented by combo box
- Form validation via Zod schemas

### Performance
- Code splitting by route
- Lazy loading of images
- Optimized bundle size
- Fast TTI (Time to Interactive)

## 📝 License

Proprietary - Gold Harbor Insurance

## 🤝 Support

For technical support or questions, contact the development team.

---

**Built with ❤️ for Gold Harbor Insurance**
 
