# AJ Components

A collection of reusable Angular components for the bookmark manager application.

## Components Overview

### AJ Icon Picker (`aj-icon-picker`)

A reusable icon picker component for selecting Font Awesome icons.

**Key Features:**
- Search functionality to filter icons
- Optional pagination (36 icons per page)
- Configurable navigation mode
- Responsive design

**Usage:**
```html
<aj-icon-picker 
  [data]="iconList"
  [enableNavigation]="true"
  (iconSelected)="onIconSelected($event)">
</aj-icon-picker>
```

**Inputs:** `data`, `enableNavigation`, `initialValue`
**Outputs:** `iconSelected`

---

### AJ Modal (`aj-modal`)

A dynamic and reusable modal component with comprehensive features.

**Key Features:**
- Dynamic header, body, and footer content
- Multiple types (default, success, warning, danger)
- Configurable sizes (sm, md, lg)
- Keyboard support (ESC key)
- Responsive design
- Content projection support

**Usage:**
```html
<aj-modal 
  [show]="showModal"
  header="Modal Title"
  type="default"
  size="md"
  (closeModal)="close()">
  
  <div modal-body>
    <!-- Modal content -->
  </div>
  
  <div modal-footer>
    <!-- Footer buttons -->
  </div>
</aj-modal>
```

**Inputs:** `show`, `header`, `type`, `size`, `showFooter`, etc.
**Outputs:** `closeModal`, `backdropClick`

---

## Installation

These components are automatically available when imported into the app module. No additional installation required.

## Dependencies

- Angular (ReactiveFormsModule)
- Font Awesome (for icons)
- CSS3 animations and flexbox

## Documentation

For detailed documentation, see individual component README files:
- `aj-icon-picker/README.md`
- `aj-modal/README.md` 