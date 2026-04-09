# Todo List

## Reservations Notifications
- [x] Upgrade to full-stack (web-db-user) for backend API
- [x] Send SMS to (972)-746-1586 on reservation confirmation
- [x] Send email to Poolsidepatrol@gmail.com on reservation confirmation
- [x] Send confirmation email to customer's provided email

## Staff Page
- [x] Create /staff page with "Meet Your Lifeguard" content moved from Home
- [x] Update bio text to new version provided by user
- [x] Update Home page to remove full About section, keep a brief teaser linking to /staff

## Tagline & Image
- [x] Change "Let the kids splash. I'll handle the safety." to "Because exceptional moments deserve exceptional safety"
- [x] Generate sunset over trees photo and replace pool party image background

## Certifications
- [x] Add "Waterpark Skills" section under certifications
- [x] Upload Red Cross certificate PDF to CDN
- [x] Create hidden /certificates page showing actual certificate documents
- [x] Make certification cards clickable to open /certificates page

## Routing
- [x] Add /staff route to App.tsx
- [x] Add /certificates route to App.tsx

## Email System
- [x] Set up Gmail SMTP with nodemailer
- [x] Create email templates for customer confirmation and owner notification
- [x] Wire up tRPC reservation.submit mutation
- [x] Send test email to Carterledger@gmail.com

## UI Updates (Round 2)
- [x] Make Waterpark Skills cards same size as other certification cards
- [x] Replace About section (headshot/intro) with "Expectations" header and arrival/setup text
- [x] Add link below Expectations to the /staff page
- [x] Reorganize /certificates page with employee folder dropdown (Ledger Carter first)
- [x] Replace "Water Safety Education" service with "Scout Safety" and new description

## Quick Fixes (Round 3)
- [x] Fix Expectations text (grammar corrections)
- [x] Replace all em dashes (—) with hyphens (-) across the whole site
- [x] Remove "Flower Mound's Trusted Private Lifeguard" badge from landing page

## Updates (Round 4)
- [x] Replace Instagram handle/icon in footer with phone number (972)-746-1586
- [x] Add "I will guard up to 25 active swimmers" line to Expectations section
- [x] Build pricing section between Services and Certifications with 3 cards
- [x] Add bottom quote "Not sure which option is right for you?"

## Updates (Round 5)
- [x] Move "25 active swimmers" callout into Expectations paragraph text, change to "one guard can monitor up to 25 active swimmers"
- [x] Remove the styled callout box around the swimmer limit
- [x] Make "Pricing" bigger in pricing section header and remove the $ symbols
- [x] Remove "What to Expect" from Expectations section header
- [x] Update Scout Safety paragraph to new text about BSA Life Scout

## Bug Fixes (Round 6)
- [x] Fix all mailto: links - replaced with copy-to-clipboard buttons

## Updates (Round 7)
- [x] SMS notification removed - T-Mobile gateway doesn't work, relying on email + Manus notifications
- [x] Add checkbox for pre-party setup + post-party teardown ($50, 90 min before / 1 hr after)
- [x] Add checkbox for life jackets ($7 per life jacket, with quantity input)
- [x] Add age range dual slider below "type of event" field, styled to match site theme

## Updates (Round 8)
- [x] Remove Home button from navbar
- [x] Make Poolside Patrol logo bigger in navbar

## Bug Fixes (Round 9)
- [x] Update "Pocket-friendly pricing" CTA text to "transparent pricing"
- [x] Change Pool Party swimmer cap from 20 to 25 to match Expectations section
- [x] Remove StarGuard certification from Home, Staff, and Certificates pages
