import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root/root.component';

@NgModule({
	imports: [
		BrowserModule
	],

	declarations: [
		RootComponent
	],

	providers: [],

	bootstrap: [
		RootComponent
	]
})
export class AppModule {
}
