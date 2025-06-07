import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, CommonModule, isPlatformBrowser, PLATFORM_ID } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  navLinks = [
    { label: 'Home', path: '#' },
    { label: 'Chat', path: '#' },
    { label: 'About', path: '#' },
    { label: 'Help', path: '#' },
    { label: 'Contact', path: '#' }
  ];

  isDarkTheme = false;

  private renderer!: Renderer2;
  private document!: Document;
  private platformId!: Object;

  constructor(
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    // Assign manually to suppress "unused" errors on constructor params and no-unused-vars for TS linter.
    this.renderer = renderer;
    this.document = document;
    this.platformId = platformId;
  }

  // PUBLIC_INTERFACE
  ngOnInit() {
    const savedTheme = this.getStoredTheme();
    if (savedTheme === 'dark') this.setDarkTheme();
    else this.setLightTheme();
  }

  // PUBLIC_INTERFACE
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) this.setDarkTheme();
    else this.setLightTheme();
  }

  private getStoredTheme(): string | null {
    // Use globalThis to pass linting in SSR (no 'window')
    if (isPlatformBrowser(this.platformId) && typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      try {
        return (globalThis as any).localStorage.getItem('talkbuddy-theme');
      } catch {
        return null;
      }
    }
    return null;
  }

  private storeTheme(theme: string) {
    if (isPlatformBrowser(this.platformId) && typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      try {
        (globalThis as any).localStorage.setItem('talkbuddy-theme', theme);
      } catch {
        // Ignore for SSR or restrictive browser environments
      }
    }
  }

  private setDarkTheme() {
    this.renderer.addClass(this.document.body, 'tb-dark-theme');
    this.renderer.removeClass(this.document.body, 'tb-light-theme');
    this.storeTheme('dark');
    this.isDarkTheme = true;
  }

  private setLightTheme() {
    this.renderer.addClass(this.document.body, 'tb-light-theme');
    this.renderer.removeClass(this.document.body, 'tb-dark-theme');
    this.storeTheme('light');
    this.isDarkTheme = false;
  }
}
