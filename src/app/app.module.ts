import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { BatteryAutomationsViewComponent } from './views/dashboard-view/views/battery-automations-view/battery-automations-view.component';
import { SettingsViewComponent } from './views/dashboard-view/views/settings-view/settings-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VarDirective } from './directives/var.directive';
import { AboutViewComponent } from './views/dashboard-view/views/about-view/about-view.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OverviewViewComponent } from './views/dashboard-view/views/overview-view/overview-view.component';
import { SleepDetectionViewComponent } from './views/dashboard-view/views/sleep-detection-view/sleep-detection-view.component';
import { DashboardNavbarComponent } from './views/dashboard-view/components/dashboard-navbar/dashboard-navbar.component';
import { DeviceListComponent } from './views/dashboard-view/components/device-list/device-list.component';
import { DeviceListItemComponent } from './views/dashboard-view/components/device-list-item/device-list-item.component';
import {
  DefaultSimpleModalOptionConfig,
  defaultSimpleModalOptions,
  SimpleModalModule,
} from 'ngx-simple-modal';
import { TimeEnableSleepModeModalComponent } from './views/dashboard-view/views/sleep-detection-view/time-enable-sleepmode-modal/time-enable-sleep-mode-modal.component';
import { TimeDisableSleepModeModalComponent } from './views/dashboard-view/views/sleep-detection-view/time-disable-sleepmode-modal/time-disable-sleep-mode-modal.component';
import { BatteryPercentageEnableSleepModeModalComponent } from './views/dashboard-view/views/sleep-detection-view/battery-percentage-enable-sleepmode-modal/battery-percentage-enable-sleep-mode-modal.component';
import { DevicePowerOnDisableSleepModeModalComponent } from './views/dashboard-view/views/sleep-detection-view/device-poweron-disable-sleepmode-modal/device-power-on-disable-sleep-mode-modal.component';
import { SleepModeEnableOnControllersPoweredOffAutomationService } from './services/sleep-detection-automations/sleep-mode-enable-on-controllers-powered-off-automation.service';
import {
  SleepModeEnableAtBatteryPercentageAutomationConfig,
  TurnOffDevicesOnSleepModeEnableAutomationConfig,
} from './models/automations';
import { SleepModeEnableAtBatteryPercentageAutomationService } from './services/sleep-detection-automations/sleep-mode-enable-at-battery-percentage-automation.service';
import { SleepModeEnableAtTimeAutomationService } from './services/sleep-detection-automations/sleep-mode-enable-at-time-automation.service';
import { SleepModeDisableAtTimeAutomationService } from './services/sleep-detection-automations/sleep-mode-disable-at-time-automation.service';
import { SleepModeDisableOnDevicePowerOnAutomationService } from './services/sleep-detection-automations/sleep-mode-disable-on-device-power-on-automation.service';
import { TurnOffDevicesWhenChargingAutomationService } from './services/automations/turn-off-devices-when-charging-automation.service';
import { TurnOffDevicesOnSleepModeEnableAutomationService } from './services/automations/turn-off-devices-on-sleep-mode-enable-automation.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    BatteryAutomationsViewComponent,
    SettingsViewComponent,
    DashboardNavbarComponent,
    DeviceListComponent,
    DeviceListItemComponent,
    VarDirective,
    AboutViewComponent,
    OverviewViewComponent,
    SleepDetectionViewComponent,
    TimeEnableSleepModeModalComponent,
    TimeDisableSleepModeModalComponent,
    BatteryPercentageEnableSleepModeModalComponent,
    DevicePowerOnDisableSleepModeModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SimpleModalModule,
  ],
  providers: [
    ThemeService,
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: {
        ...defaultSimpleModalOptions,
        ...{
          closeOnEscape: true,
          closeOnClickOutside: false,
          wrapperDefaultClasses: 'modal-wrapper',
          animationDuration: '150',
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    // Sleep mode automations
    sleepModeEnableOnControllersPoweredOffAutomation: SleepModeEnableOnControllersPoweredOffAutomationService,
    sleepModeEnableAtBatteryPercentageAutomation: SleepModeEnableAtBatteryPercentageAutomationService,
    sleepModeEnableAtTimeAutomationService: SleepModeEnableAtTimeAutomationService,
    sleepModeDisableAtTimeAutomationService: SleepModeDisableAtTimeAutomationService,
    sleepModeDisableOnDevicePowerOnAutomationService: SleepModeDisableOnDevicePowerOnAutomationService,
    // Battery automations
    turnOffDevicesOnSleepModeEnableAutomationService: TurnOffDevicesOnSleepModeEnableAutomationService,
    turnOffDevicesWhenChargingAutomationService: TurnOffDevicesWhenChargingAutomationService
  ) {
    Promise.all([
      // Sleep mode automations
      sleepModeEnableOnControllersPoweredOffAutomation.init(),
      sleepModeEnableAtBatteryPercentageAutomation.init(),
      sleepModeEnableAtTimeAutomationService.init(),
      sleepModeDisableAtTimeAutomationService.init(),
      sleepModeDisableOnDevicePowerOnAutomationService.init(),
      // Battery automations
      turnOffDevicesOnSleepModeEnableAutomationService.init(),
      turnOffDevicesWhenChargingAutomationService.init(),
    ]);
  }
}
