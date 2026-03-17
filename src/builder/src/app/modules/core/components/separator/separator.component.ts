import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
