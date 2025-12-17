# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-12

### Added

#### Developer Experience & Foundation

- ✅ Configured absolute imports using `@/` prefix
- ✅ Added VSCode workspace configuration (settings, extensions, debug)
- ✅ Integrated Prettier for code formatting with Tailwind CSS plugin
- ✅ Enhanced ESLint configuration with strict TypeScript rules
- ✅ Added Knip for unused files and dependencies detection
- ✅ Integrated Lefthook for Git hooks (replacing Husky)
- ✅ Added Commitlint for enforcing conventional commits
- ✅ Added Commitizen for interactive commit message creation
- ✅ Configured lint-staged for running linters on staged files
- ✅ Created `.env.example` for environment variable documentation

### Configuration Files Added

- `.vscode/settings.json` - VSCode workspace settings
- `.vscode/extensions.json` - Recommended extensions
- `.vscode/launch.json` - Debug configurations
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Prettier ignore patterns
- `knip.json` - Knip configuration
- `lefthook.yml` - Git hooks configuration
- `commitlint.config.js` - Commit message linting rules

### Scripts Added

- `lint:fix` - Auto-fix linting errors
- `format` - Format code with Prettier
- `format:check` - Check code formatting
- `type-check` - TypeScript type checking
- `knip` - Detect unused files and dependencies
- `commit` - Interactive commit with Commitizen

## [0.2.0] - 2025-12-12

### Added

#### UI Development Environment

- ✅ Verified Tailwind CSS 4 configuration (PostCSS, custom theme, dark mode)
- ✅ Installed and configured Storybook 10.1.7 with Next.js + Vite
- ✅ Integrated Tailwind CSS into Storybook preview
- ✅ Created Button component (`components/ui/button.tsx`) with CVA variants
- ✅ Created comprehensive Button stories with all variants and sizes
- ✅ Added Storybook addons: a11y, docs, vitest, chromatic, onboarding

### Scripts Added

- `storybook` - Start Storybook dev server on port 6006
- `build-storybook` - Build static Storybook site

### Configuration Files Added

- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Global preview settings
- `components/ui/button.tsx` - Button component
- `components/ui/button.stories.tsx` - Button stories

## [0.3.0] - 2025-12-15

### Added

#### Core Architecture & Type Safety

- ✅ Integrated T3 Env (`@t3-oss/env-nextjs`) for type-safe environment variables
- ✅ Added Zod for runtime environment variable validation
- ✅ Created `env.ts` with comprehensive environment schema
- ✅ Configured build-time validation (app refuses to build with invalid env vars)
- ✅ Updated `.env.example` with detailed documentation
- ✅ Implemented typed environment variable usage in `app/layout.tsx`

### Configuration Files Added

- `env.ts` - Type-safe environment variable schema and validation
- `.env` - Local environment variables (gitignored)

### Changed

- Updated `next.config.ts` to import and validate environment variables
- Updated `app/layout.tsx` to use typed environment variables
- Enhanced `.env.example` with validation requirements and examples

## [0.5.0] - 2025-12-17

### Changed

#### Sidebar Layout & UI Refinement

- ♻️ Reorganized sidebar layout by moving `NavUser` from footer to header
- ♻️ Positioned `NavUser` as second item after logo in sidebar header
- ♻️ Removed `SidebarFooter` component when not needed
- ♻️ Cleaned up unused imports in sidebar components

### Improved

- 🎨 Better visual hierarchy in sidebar navigation
- 🎨 Improved user profile accessibility and visibility
- 🎨 More consistent with modern dashboard UI patterns
- 🧹 Cleaner component structure and code organization

### Files Modified

- `components/layout/app-sidebar.tsx` - Sidebar structure reorganization
- `app/(backoffice)/layout.tsx` - Layout updates

### Documentation

- Added `docs/v0.5.0-sidebar-layout.md` - Comprehensive implementation guide

## [Unreleased]

### Planned for v0.6.0 - Authentication & User Management

- User authentication system
- Role-based access control
- User profile management
