import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ElementRef,
  NgZone,
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterContentInit } from '@angular/core';
import { tap } from 'rxjs/operators';

/** @title Fixed size virtual scroll with custom buffer parameters */
@Component({
  selector: 'cdk-virtual-scroll-fixed-buffer-example',
  styleUrls: ['cdk-virtual-scroll-fixed-buffer-example.css'],
  templateUrl: 'cdk-virtual-scroll-fixed-buffer-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkVirtualScrollFixedBufferExample
  implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit
{
  @ViewChild('num1') viewPort1!: CdkVirtualScrollViewport;
  @ViewChild('num2') viewPort2!: CdkVirtualScrollViewport;
  @ViewChild('num3') viewPort3!: CdkVirtualScrollViewport;
  @ViewChild('num4') viewPort4!: CdkVirtualScrollViewport;
  items = Array.from({ length: 10000 }).map((_, i) => `Item #${i}`);
  private scrollIndex: number = 0;
  private isScrollSuccessful: boolean = false;

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    console.log(`ngOnInit`);
    this.scrollIndex = 5000;
    this.viewPort1.elementScrolled().pipe(
      tap((val) => {
        console.log(`viewPort1 scrolled: `, val);
      })
    );

    this.scroll(this.viewPort1, this.scrollIndex); // DOES NOT WORK HERE
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
    this.scroll(this.viewPort2, this.scrollIndex); // DOES NOT WORK HERE
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit`);
    this.scroll(this.viewPort3, this.scrollIndex); // DOES NOT WORK HERE
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked::scroll to index: ', this.scrollIndex);
    this.scroll(this.viewPort4, this.scrollIndex); // ONLY WORKS HERE BUT IS CALLED MULTIPLE TIMES AND DOES NOT WORK ON FIRST TIME CALLED
  }

  scroll(viewPort, scrollIndex: number) {
    this.zone.runTask(() => {
      console.log(`scrolling viewPort ${viewPort.Name} to index: `, scrollIndex);
      viewPort.scrollToIndex(scrollIndex, 'auto');
    });
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
