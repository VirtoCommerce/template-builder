import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatProgressSpinner]
})
export class SpinnerComponent implements OnInit {

  ngOnInit(): void {
  }

}
