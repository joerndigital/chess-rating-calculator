import { Component, OnInit, HostListener } from "@angular/core";
import { DwzService } from "src/app/service/dwz.service";

@Component({
  selector: "rating-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {

  public isMobile = false;

  constructor(public dwzService: DwzService) {}

  @HostListener("window:resize", [])
  private onResize() {

    if (window.innerWidth <= 480) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit() {
    this.onResize();
  }

  onDelete(index: number) {
    this.dwzService.deleteOpponent(index);
  }
}
