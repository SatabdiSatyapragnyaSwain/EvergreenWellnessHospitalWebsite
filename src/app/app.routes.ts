import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OuridentityComponent } from './ouridentity/ouridentity.component';
import { OurinfrastructureComponent } from './ourinfrastructure/ourinfrastructure.component';
import { WhatourclientsayComponent } from './whatourclientsay/whatourclientsay.component';
import { GenerallaparoscopicComponent } from './generallaparoscopic/generallaparoscopic.component';
import { EntComponent } from './ent/ent.component';
import { NeurosurgeryComponent } from './neurosurgery/neurosurgery.component';
import { OrthopedicstraumaComponent } from './orthopedicstrauma/orthopedicstrauma.component';
import { SkincosmetologyComponent } from './skincosmetology/skincosmetology.component';
import { UrologyComponent } from './urology/urology.component';
import { GastroenterologyComponent } from './gastroenterology/gastroenterology.component';
import { MedicinecardiologyComponent } from './medicinecardiology/medicinecardiology.component';
import { PhysiotherapyComponent } from './physiotherapy/physiotherapy.component';
import { GynaecologyobstetricsComponent } from './gynaecologyobstetrics/gynaecologyobstetrics.component';
import { CosmeticreconstrucComponent } from './cosmeticreconstruc/cosmeticreconstruc.component';
import { OphthalmologyComponent } from './ophthalmology/ophthalmology.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { PsychiatristComponent } from './psychiatrist/psychiatrist.component';
import { OurdoctorsComponent } from './ourdoctors/ourdoctors.component';
import { OpdtimingComponent } from './opdtiming/opdtiming.component';
import { ContactusComponent } from './contactus/contactus.component';

export const routes: Routes = [
  {
    path: 'Home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'Ouridentity', component: OuridentityComponent },
      { path: 'Ourinfrastructure', component: OurinfrastructureComponent },
      { path: 'clientsay', component: WhatourclientsayComponent },
      { path: 'GeneralLaparoscopic', component: GenerallaparoscopicComponent },
      { path: 'ENT', component: EntComponent },
      { path: 'Neurosurgery', component: NeurosurgeryComponent },
      { path: 'Orthopedics', component: OrthopedicstraumaComponent },
      { path: 'Skin&Cosmetology', component: SkincosmetologyComponent },
      { path: 'Urology', component: UrologyComponent },
      { path: 'Gastroenterology', component: GastroenterologyComponent },
      { path: 'Medicine&Cardiology', component: MedicinecardiologyComponent },
      { path: 'Physiotherapy', component: PhysiotherapyComponent },
      { path: 'Gynaecology&Obstetrics', component: GynaecologyobstetricsComponent },
      { path: 'Cosmetic&Reconstruc', component: CosmeticreconstrucComponent },
      { path: 'Ophthalmology', component: OphthalmologyComponent },
      { path: 'Diagnostic', component: DiagnosticComponent },
      { path: 'Psychiatrist', component: PsychiatristComponent },
      { path: 'OurDoctor', component: OurdoctorsComponent },
      { path: 'OPDTiming', component: OpdtimingComponent },
      { path: 'Contactus', component: ContactusComponent },
    ],
  },
  { path: '', redirectTo: '/Home/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home/dashboard' }
];