// Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

// Services
import { StorageService } from "./services/storage.service";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [StorageService],
})
export class CoreModule {}
