# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Architecture

**Mimir Analysis** is a Next.js 14 cannabis test result analysis application with internationalization support (Danish/English).

### Core Technologies
- **Next.js 14** with App Router
- **TypeScript** with strict configuration
- **Tailwind CSS** + shadcn/ui components
- **Zustand** for state management
- **Sanity CMS** for content management
- **Recharts** for data visualization
- **next-intl** for internationalization

### State Management Architecture

The application uses 4 main Zustand stores in `/app/_store/`:

1. **`answersStore`** - Analysis results and interpretations
2. **`datapointsStore`** - Test data points with dates and values
3. **`utilitiesStore`** - UI state (modals, warnings, language, units)
4. **`modelStore`** - Analysis model selection (chronic vs occasional)

Key types defined in `/app/_store/types.ts`:
- `DataPoint` - Individual test results
- `Answers` - Analysis interpretations  
- `UnitType` - "mg/mol" or "mg/dL"
- `ModelType` - "chronic" or "occasional"

### Directory Structure

```
/app/[locale]/          # Internationalized routes (da/en)
├── General/            # Shared components (Dashboard, Charts)
├── dashboard/          # Main analysis interface
├── articles/           # Knowledge center
├── contact/            # Contact page
└── faq/               # FAQ section

/app/_store/            # Zustand state management
/app/Components/        # Global components
/app/utils/            # Utility functions and analysis models
/app/admin/            # Sanity CMS admin interface
```

### Key Configuration

- **Internationalization**: Default locale is Danish (`da`), with English (`en`) support via next-intl
- **Image Optimization**: Configured for Sanity CDN and Unsplash
- **TypeScript**: Build errors are ignored (`ignoreBuildErrors: true`)
- **Path Aliases**: `@/*` maps to project root

### Sanity CMS Integration

- **Project ID**: `8fzky4zl`
- **Dataset**: `production`
- **Admin Interface**: `/admin` route
- **Content Types**: Articles, Authors, FAQs
- **Configuration**: `/sanity.config.ts`

### Analysis Model System

The core analysis logic is in `/app/utils/model.js`. The application supports two analysis models:
- **Chronic use** - For regular cannabis users
- **Occasional use** - For infrequent users

Results are color-coded (green, orange, red borders) based on calculated interpretations.

### Development Notes

- Main dashboard combines input, results, and chart visualization
- All components use shadcn/ui for consistency
- Date handling uses date-fns library
- Charts built with Recharts
- Mobile-first responsive design
- Dark mode support via next-themes