# Bookmark Manager

A modern, responsive bookmark management application built with Angular 16, featuring a clean interface for organizing bookmarks into collections with advanced UI components.

## ✨ Features

### 🎯 Core Functionality
- **Collection Management**: Create and organize bookmarks into collections
- **Bookmark Management**: Add bookmarks with custom icons and URLs
- **Favorite System**: Mark and manage favorite collections and bookmarks
- **Search Interface**: Clean search bar for discovering bookmarks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 UI/UX Features
- **Modern Interface**: Clean and professional design with gradient themes
- **View Modes**: Toggle between Grid and List view for collections
- **Tree View**: Expandable collection structure for better organization
- **Heart Icon Toggle**: Interactive favorite marking with hover effects
- **Modal Dialogs**: Reusable modal components for forms and interactions

### 🔧 Technical Features
- **Custom Components**: Reusable UI components (icon picker, modal)
- **Form Validation**: Comprehensive validation for all input fields
- **Reactive Forms**: Modern Angular reactive forms implementation
- **Service Architecture**: Clean separation of concerns with services
- **Mock API**: Interceptor-based mock API for development

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Angular CLI: `npm install -g @angular/cli`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anandrajput007/bookmark-manager.git
   cd bookmark-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── aj-components/           # Reusable UI Components
│   │   ├── aj-icon-picker/     # Icon selection component
│   │   ├── aj-modal/           # Modal dialog component
│   │   └── README.md           # Component documentation
│   ├── components/
│   │   ├── action-bar/         # Main action toolbar
│   │   ├── add-bookmark/       # Add bookmark modal
│   │   ├── add-collection/     # Add collection modal
│   │   ├── bookmark-bar/       # Bookmark display component
│   │   └── dashboard/          # Main dashboard component
│   ├── services/
│   │   └── dashboard/
│   │       └── collection.service.ts
│   ├── shared/
│   │   └── data/
│   │       ├── collections.ts  # Mock collection data
│   │       └── fontawesome-icons.ts
│   ├── interceptors/
│   │   └── mock-api.interceptor.ts
│   └── app.module.ts
├── assets/
└── styles.scss
```

## 🎮 Usage Guide

### Adding Collections
1. Click the **📁** (folder-plus) button in the action bar
2. Enter collection name and select an icon
3. Click "Save" to create the collection

### Adding Bookmarks
1. Click the **+** (plus) button in the action bar
2. Select a collection from the dropdown
3. Enter bookmark name and URL
4. Choose an icon for the bookmark
5. Click "Save" to add the bookmark

### Managing Views
- **Grid View**: Click the **⊞** button for grid layout
- **List View**: Click the **☰** button for list layout
- **Tree View**: Click on collection names to expand/collapse

### Favorites
- Click the **❤️** icon next to collections or bookmarks to toggle favorites
- Favorites are highlighted and can be filtered

## 🧩 Custom Components

### AJ Icon Picker (`aj-icon-picker`)
A reusable icon selection component with:
- Search functionality
- Pagination
- Tooltips
- Navigation controls
- Customizable data source

**Usage:**
```html
<aj-icon-picker 
  [data]="iconData"
  [enableNavigation]="true"
  [initialValue]="selectedIcon"
  (iconSelected)="onIconSelected($event)">
</aj-icon-picker>
```

### AJ Modal (`aj-modal`)
A flexible modal dialog component with:
- Dynamic header, body, and footer
- Multiple types and sizes
- Keyboard support (ESC to close)
- Backdrop click to close
- Animations
- Content projection

**Usage:**
```html
<aj-modal 
  [show]="isOpen"
  header="Modal Title"
  type="default"
  size="md"
  [showFooter]="true"
  (closeModal)="close()">
  
  <div modal-body>
    <!-- Modal content -->
  </div>
  
  <div modal-footer>
    <!-- Footer buttons -->
  </div>
</aj-modal>
```

## 🎨 Styling & Theming

### Color Scheme
The application uses a modern gradient theme:
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Accent Color**: `rgb(255, 212, 59)` (yellow)
- **Error Color**: `#dc2626` (red)

### Responsive Breakpoints
- **Desktop**: 992px and above
- **Tablet**: 768px to 991px
- **Mobile**: Below 768px

## 🛠️ Development

### Building for Production
```bash
ng build --prod
```

### Running Tests
```bash
ng test
```

### Code Generation
```bash
# Generate a new component
ng generate component components/component-name

# Generate a new service
ng generate service services/service-name
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **Bootstrap Team** for the responsive CSS framework
- **Font Awesome** for the beautiful icon library
- **Community** for inspiration and feedback
