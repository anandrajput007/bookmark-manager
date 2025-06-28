# AJ Modal Component

A reusable and dynamic modal (dialog) component for Angular applications with comprehensive features and customization options.

## Features

✅ **Dynamic Header** - Configurable header text  
✅ **Dynamic Body Content** - Support for any HTML content, forms, components  
✅ **Dynamic Footer** - Optional footer with custom buttons  
✅ **Type Styling** - Different visual styles (default, success, warning, danger)  
✅ **Size Configuration** - Multiple sizes (sm, md, lg)  
✅ **Show/Hide Control** - Easy open/close management  
✅ **Close Button** - Configurable close button in header  
✅ **Content Projection** - Uses `<ng-content>` for dynamic content  
✅ **Responsive Design** - Mobile-friendly and responsive  
✅ **Keyboard Support** - ESC key to close (configurable)  
✅ **Backdrop Click** - Click outside to close (configurable)  
✅ **Animations** - Smooth open/close animations  
✅ **Accessibility** - ARIA labels and focus management  

## Usage

### Basic Usage

```html
<aj-modal 
  [show]="showModal"
  header="My Modal Title"
  (closeModal)="showModal = false">
  
  <div modal-body>
    <p>This is the modal body content.</p>
  </div>
  
  <div modal-footer>
    <button class="btn btn-secondary" (click)="showModal = false">Cancel</button>
    <button class="btn btn-primary" (click)="save()">Save</button>
  </div>
</aj-modal>
```

### Advanced Usage with All Options

```html
<aj-modal 
  [show]="showModal"
  header="Advanced Modal"
  type="success"
  size="lg"
  [showFooter]="true"
  [closeOnBackdropClick]="true"
  [closeOnEsc]="true"
  [showCloseButton]="true"
  [animation]="true"
  (closeModal)="onClose()"
  (backdropClick)="onBackdropClick()">
  
  <div modal-body>
    <form [formGroup]="myForm">
      <div class="form-group">
        <label>Name</label>
        <input type="text" formControlName="name" class="form-control">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" formControlName="email" class="form-control">
      </div>
    </form>
  </div>
  
  <div modal-footer>
    <button class="btn btn-secondary" (click)="onClose()">Cancel</button>
    <button class="btn btn-success" (click)="onSave()">Save</button>
  </div>
</aj-modal>
```

### Modal Without Footer

```html
<aj-modal 
  [show]="showInfoModal"
  header="Information"
  type="default"
  [showFooter]="false">
  
  <div modal-body>
    <p>This is an informational modal without a footer.</p>
    <p>It will automatically close when the close button is clicked.</p>
  </div>
</aj-modal>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | `boolean` | `false` | Controls modal visibility |
| `header` | `string` | `''` | Modal header text |
| `type` | `ModalType` | `'default'` | Visual style type |
| `size` | `ModalSize` | `'md'` | Modal size |
| `showFooter` | `boolean` | `true` | Show/hide footer |
| `closeOnBackdropClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEsc` | `boolean` | `true` | Close on ESC key |
| `showCloseButton` | `boolean` | `true` | Show close button in header |
| `animation` | `boolean` | `true` | Enable animations |

## Output Events

| Event | Type | Description |
|-------|------|-------------|
| `closeModal` | `EventEmitter<void>` | Emitted when modal is closed |
| `backdropClick` | `EventEmitter<void>` | Emitted when backdrop is clicked |

## Types

### ModalType
```typescript
type ModalType = 'default' | 'success' | 'warning' | 'danger';
```

### ModalSize
```typescript
type ModalSize = 'sm' | 'md' | 'lg';
```

## Type Variations

- **default**: Gray styling
- **success**: Green styling
- **warning**: Yellow/Orange styling  
- **danger**: Red styling

## Size Variations

- **sm**: 400px max-width
- **md**: 600px max-width (default)
- **lg**: 800px max-width

## Content Projection

The modal uses Angular content projection with specific selectors:

- `[modal-body]` - Content for the modal body
- `[modal-footer]` - Content for the modal footer

## Styling

The component uses BEM methodology for CSS classes:

- `.aj-modal` - Main modal container
- `.aj-modal__content` - Modal content wrapper
- `.aj-modal__header` - Modal header
- `.aj-modal__body` - Modal body
- `.aj-modal__footer` - Modal footer

## Accessibility Features

- ARIA labels on close button
- Focus management
- Keyboard navigation (ESC key)
- Screen reader friendly

## Responsive Design

- Mobile-first approach
- Responsive breakpoints at 768px and 480px
- Flexible sizing on mobile devices
- Touch-friendly interactions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers

## Dependencies

- Angular (no external modal libraries)
- Font Awesome (for close icon)
- CSS3 animations and flexbox 