# Angular Dashboard

A responsive dashboard built with Angular 16, Bootstrap 5, and Font Awesome icons.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional dashboard interface
- **Bootstrap 5**: Latest Bootstrap framework for responsive layouts
- **Font Awesome**: Beautiful icons throughout the interface
- **Mobile Menu**: Collapsible sidebar for mobile devices
- **Statistics Cards**: Animated cards displaying key metrics
- **Recent Activity Table**: User activity tracking
- **Quick Actions**: Common actions easily accessible
- **System Status**: Real-time system monitoring

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd angular-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Development Server

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── dashboard.component.html
│   │   ├── dashboard.component.scss
│   │   └── dashboard.component.ts
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── styles.scss
└── index.html
```

## Technologies Used

- **Angular 16**: Frontend framework
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library
- **SCSS**: CSS preprocessor
- **TypeScript**: Programming language

## Responsive Breakpoints

- **Desktop**: 992px and above
- **Tablet**: 768px to 991px
- **Mobile**: Below 768px

## Customization

### Colors
The dashboard uses a gradient theme that can be customized in `src/styles.scss`:

```scss
.sidebar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding New Components
To add new dashboard components:

1. Generate a new component:
   ```bash
   ng generate component component-name
   ```

2. Add the route in `app-routing.module.ts`
3. Update the sidebar navigation in `dashboard.component.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
