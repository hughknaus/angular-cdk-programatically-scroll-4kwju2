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
  @ViewChild('onInit') viewPort1!: CdkVirtualScrollViewport;
  @ViewChild('afterContentInit') viewPort2!: CdkVirtualScrollViewport;
  @ViewChild('afterViewInit') viewPort3!: CdkVirtualScrollViewport;
  @ViewChild('afterViewChecked') viewPort4!: CdkVirtualScrollViewport;
  items = Array.from({ length: 10000 }).map((_, i) => `Item #${i}`);
  private scrollIndex: number = 0;

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    console.log(`ngOnInit`);
    this.scrollIndex = 5000;
    this.viewPort1.elementScrolled().pipe(
      tap((val) => {
        console.log(`viewPort1 scrolled: `, val);
      })
    );

    this.viewPort2.elementScrolled().pipe(
      tap((val) => {
        console.log(`viewPort2 scrolled: `, val);
      })
    );

    this.viewPort3.elementScrolled().pipe(
      tap((val) => {
        console.log(`viewPort3 scrolled: `, val);
      })
    );

    this.viewPort4.elementScrolled().pipe(
      tap((val) => {
        console.log(`viewPort4 scrolled: `, val);
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
    console.log(`ngAfterViewChecked`);
    this.scroll(this.viewPort4, this.scrollIndex); // ONLY WORKS HERE BUT IS CALLED MULTIPLE TIMES AND DOES NOT WORK ON FIRST TIME CALLED
  }

  scroll(viewPort: CdkVirtualScrollViewport, scrollIndex: number) {
    //this.zone.runTask(() => {  // Test inside and outside of an NgZone -- no difference
    console.log(
      ` - scrolling viewPort ${viewPort.elementRef.nativeElement.getAttribute(
        'id'
      )} to index: `,
      scrollIndex
    );
    viewPort.scrollToIndex(scrollIndex, 'auto');
    //});
  }

  scrollAllViewPorts(scrollIndex: number) {
    console.log(`scrollAllViewPorts::buttonClicked`);
    this.scroll(this.viewPort1, scrollIndex); // WORKS
    this.scroll(this.viewPort2, scrollIndex); // WORKS
    this.scroll(this.viewPort3, scrollIndex); // WORKS
    this.scroll(this.viewPort4, scrollIndex); // WORKS BUT IS OVERRIDDEN BY ngAfterViewChecked
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
