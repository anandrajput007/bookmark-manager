import { Component } from '@angular/core';
import { FONT_AWESOME_ICONS } from '../../shared/data/fontawesome-icons';

@Component({
  selector: 'aj-icon-picker-demo',
  template: `
    <div class="demo-container">
      <h2>AJ Icon Picker Demo</h2>
      
      <div class="demo-section">
        <h3>With Navigation (Default)</h3>
        <p>This shows the icon picker with pagination enabled (36 icons per page)</p>
        <aj-icon-picker 
          [data]="icons"
          [enableNavigation]="true"
          [initialValue]="'fa-folder'"
          (iconSelected)="onIconSelected($event, 'nav')">
        </aj-icon-picker>
        <p>Selected: {{ selectedIconNav || 'None' }}</p>
      </div>
      
      <div class="demo-section">
        <h3>Without Navigation</h3>
        <p>This shows all icons at once without pagination</p>
        <aj-icon-picker 
          [data]="icons"
          [enableNavigation]="false"
          [initialValue]="'fa-star'"
          (iconSelected)="onIconSelected($event, 'no-nav')">
        </aj-icon-picker>
        <p>Selected: {{ selectedIconNoNav || 'None' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .demo-section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background-color: #f9fafb;
    }
    
    h2 {
      color: #374151;
      margin-bottom: 30px;
    }
    
    h3 {
      color: #4b5563;
      margin-bottom: 10px;
    }
    
    p {
      color: #6b7280;
      margin-bottom: 15px;
    }
  `]
})
export class AjIconPickerDemoComponent {
  icons = FONT_AWESOME_ICONS;
  selectedIconNav: string = '';
  selectedIconNoNav: string = '';

  onIconSelected(icon: string, type: 'nav' | 'no-nav'): void {
    if (type === 'nav') {
      this.selectedIconNav = icon;
    } else if (type === 'no-nav') {
      this.selectedIconNoNav = icon;
    }
    console.log(`Icon selected (${type}):`, icon);
  }
} 