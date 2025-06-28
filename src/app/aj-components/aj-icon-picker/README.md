# AJ Icon Picker Component

A reusable Angular component for selecting Font Awesome icons with search and optional pagination functionality.

## Features

- **Search Functionality**: Filter icons by name
- **Optional Pagination**: Show all icons at once or paginate them
- **Responsive Design**: Works well on different screen sizes
- **Customizable**: Configurable through input properties
- **Accessible**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```html
<aj-icon-picker 
  [data]="iconList"
  (iconSelected)="onIconSelected($event)">
</aj-icon-picker>
```

### With Navigation (Default)

```html
<aj-icon-picker 
  [data]="iconList"
  [enableNavigation]="true"
  [initialValue]="'fa-folder'"
  (iconSelected)="onIconSelected($event)">
</aj-icon-picker>
```

### Without Navigation (All Icons at Once)

```html
<aj-icon-picker 
  [data]="iconList"
  [enableNavigation]="false"
  [initialValue]="'fa-star'"
  (iconSelected)="onIconSelected($event)">
</aj-icon-picker>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `string[]` | `[]` | Array of Font Awesome icon class names |
| `enableNavigation` | `boolean` | `true` | Enable/disable pagination |
| `initialValue` | `string` | `''` | Initial selected icon |

## Output Events

| Event | Type | Description |
|-------|------|-------------|
| `iconSelected` | `EventEmitter<string>` | Emitted when an icon is selected |

## Example Implementation

```typescript
import { Component } from '@angular/core';
import { FONT_AWESOME_ICONS } from '../shared/data/fontawesome-icons';

@Component({
  selector: 'app-my-component',
  template: `
    <aj-icon-picker 
      [data]="availableIcons"
      [enableNavigation]="true"
      [initialValue]="selectedIcon"
      (iconSelected)="onIconSelected($event)">
    </aj-icon-picker>
  `
})
export class MyComponent {
  availableIcons = FONT_AWESOME_ICONS;
  selectedIcon = 'fa-folder';

  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    console.log('Selected icon:', icon);
  }
}
```

## Styling

The component uses SCSS with the following CSS classes:

- `.icon-picker`: Main container
- `.selected-icon`: The currently selected icon display
- `.icon-search-box`: Search input field
- `.icon-grid`: Grid container for icons
- `.icon-item`: Individual icon items
- `.icon-pagination`: Pagination controls

You can customize the appearance by overriding these classes in your component's styles.

## Dependencies

- Angular Forms (ReactiveFormsModule)
- Font Awesome CSS (for icon display)

## Notes

- When `enableNavigation` is `false`, all icons are displayed at once without pagination
- Search functionality works in both modes
- The component automatically resets search and pagination when an icon is selected
- Icons per page is set to 36 by default when navigation is enabled 