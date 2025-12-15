# Authentication Pages

This directory contains authentication-related pages for the application.

## Pages

### Login (`/auth/login`)

A modern login page with the following features:

- **Email/Password Authentication**
  - Email input with validation
  - Password input with show/hide toggle
  - Remember me checkbox
  - Forgot password link

- **Social Login**
  - Google OAuth integration (placeholder)
  - GitHub OAuth integration (placeholder)

- **UI/UX Features**
  - Loading states during form submission
  - Responsive design (mobile-first)
  - Accessible form controls
  - Icon indicators for input fields
  - Smooth animations and transitions

### Register (`/auth/register`)

A comprehensive registration page with:

- **Form Fields**
  - Full name input
  - Email input with validation
  - Password input with show/hide toggle
  - Confirm password with validation

- **Password Strength Indicator**
  - Real-time password strength analysis
  - Visual progress bar (color-coded)
  - Requirements checklist:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character

- **Social Registration**
  - Google OAuth integration (placeholder)
  - GitHub OAuth integration (placeholder)

- **Terms and Conditions**
  - Checkbox for accepting terms
  - Links to Terms of Service and Privacy Policy

- **UI/UX Features**
  - Real-time password validation
  - Password match validation
  - Loading states
  - Responsive design
  - Accessible form controls

## Components Used

- `Button` - Primary action buttons
- `Input` - Form input fields
- `Label` - Form labels
- `Card` - Container components
- Icons from `lucide-react`:
  - `Mail` - Email field indicator
  - `Lock` - Password field indicator
  - `User` - Name field indicator
  - `Eye/EyeOff` - Password visibility toggle
  - `CheckCircle2` - Password requirements indicator

## Styling

- Uses Tailwind CSS for styling
- Gradient background for visual appeal
- Card-based layout with shadows
- Consistent spacing and typography
- Dark mode support through CSS variables

## Future Enhancements

- [ ] Integrate with actual authentication backend (NextAuth.js, Supabase, etc.)
- [ ] Add email verification flow
- [ ] Implement forgot password functionality
- [ ] Add two-factor authentication (2FA)
- [ ] Implement rate limiting
- [ ] Add CAPTCHA for bot protection
- [ ] Add session management
- [ ] Implement OAuth providers (Google, GitHub)
- [ ] Add error handling and toast notifications
- [ ] Add form validation with Zod
- [ ] Integrate with React Hook Form

## Usage

Navigate to the pages:

- Login: `http://localhost:3000/auth/login`
- Register: `http://localhost:3000/auth/register`

## Notes

- Currently, form submissions are simulated with setTimeout
- Social login buttons are placeholders and need OAuth configuration
- Password validation is client-side only; server-side validation is required
- No actual authentication is performed yet
