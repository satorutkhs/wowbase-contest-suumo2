# Multi-Timezone Digital Clock

A responsive web application that displays the current time across multiple time zones simultaneously.

## Features

- **Real-time Updates**: Clock updates every second with precise timing
- **Multiple Timezones**: Display time for multiple time zones simultaneously
- **Timezone Selection**: Choose from popular timezones or enter custom ones
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful handling of invalid timezone inputs
- **User-friendly**: Clean, modern interface with intuitive controls

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Add Timezones**: 
   - Select a timezone from the dropdown and click "Add"
   - Or enter a custom timezone (e.g., "Asia/Bangkok") and click "Add Custom"
3. **Remove Timezones**: Click the "×" button on any clock card to remove it
4. **View Times**: All clocks update automatically every second

## Default Timezones

The application starts with these default timezones:
- UTC
- New York (America/New_York)
- London (Europe/London)
- Tokyo (Asia/Tokyo)

## Custom Timezones

You can add any valid timezone identifier, such as:
- `Asia/Bangkok`
- `Europe/Paris`
- `America/Los_Angeles`
- `Australia/Melbourne`
- `Pacific/Auckland`

## Technical Features

- **Pure HTML/CSS/JavaScript** - No external dependencies
- **Modern Browser APIs** - Uses `Intl.DateTimeFormat` for timezone handling
- **Responsive Grid Layout** - Adapts to different screen sizes
- **Performance Optimized** - Pauses updates when page is not visible
- **Error Recovery** - Handles invalid timezones and network issues gracefully

## Browser Compatibility

Compatible with all modern browsers that support:
- ES6+ JavaScript
- CSS Grid
- Intl.DateTimeFormat API

## Development

To run locally:
1. Clone this repository
2. Open `index.html` in a web browser, or
3. Start a local HTTP server: `python3 -m http.server 8000`
4. Navigate to `http://localhost:8000`

## License

MIT License - see LICENSE file for details.
