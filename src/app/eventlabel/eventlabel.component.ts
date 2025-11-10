import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventlabel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventlabel.component.html',
  styleUrl: './eventlabel.component.css'
})
export class EventlabelComponent {
  @Input() event: any;
  @Input() hideRegister: boolean = false;
  @Output() registerEvent = new EventEmitter<any>();
  
  showDetailsPopup = false;

  viewMore(event: Event) {
    event.stopPropagation();
    this.showDetailsPopup = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.showDetailsPopup = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  onRegister(event: Event) {
    event.stopPropagation();
    this.registerEvent.emit(this.event);
    this.closePopup();
  }
}
