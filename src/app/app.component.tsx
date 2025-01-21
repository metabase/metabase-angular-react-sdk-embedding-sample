import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

import React from "react";
import ReactDOM, { Root } from "react-dom/client";

import {
  InteractiveQuestion,
  MetabaseProvider,
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
} from "@metabase/embedding-sdk-react";

const containerElementRef = "customReactComponentContainer";

const METABASE_INSTANCE_URL = "https://shoppy.hosted.staging.metabase.com";  // Required: Your Metabase instance URL
const API_HOST = "https://embedded-analytics-sdk-demo.metabase.com/api"; // Required: An endpoint in your app that signs the user in and returns a session
const JWT_PROVIDER_URI = "/sso/metabase?site=proficiency";

const authConfig = defineMetabaseAuthConfig({
  metabaseInstanceUrl: METABASE_INSTANCE_URL,
  authProviderUri: `${API_HOST}${JWT_PROVIDER_URI}`, 
});

const theme = defineMetabaseTheme({
  fontSize: "14px",
  colors: {
    brand: "green",
  },
});

@Component({
  selector: "app-root",
  template: `<span #${containerElementRef}></span>`,
  // styleUrls: [""],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;

  @Input() public questionId = 106;

  private reactRoot: Root | null = null;

  constructor(private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.reactRoot = ReactDOM.createRoot(this.containerRef.nativeElement);

    this.render();
  }

  ngOnDestroy() {
    this.reactRoot?.unmount();
  }

  private render() {
    const { questionId } = this;

    this.reactRoot?.render(
      <MetabaseProvider authConfig={authConfig} theme={theme}>
        <InteractiveQuestion questionId={questionId} />
      </MetabaseProvider>
    );
  }
}
