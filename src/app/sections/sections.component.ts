import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  private sectionsUrl = 'api/sections';  // URL to web api
  sections: Section[];
  activeSection: string;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.readSections();
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  readSections(): void {
    this.getSections()
      .subscribe(sections => {
        this.sections = sections;
        if (!this.activeSection && this.sections.length > 0) {
          this.showSection(this.sections[0]);
        }
      })
  }

  showSection(section: Section) {
    this.activeSection = section.title;
  }

}

interface Section {
  _id: string;
  title: string;
}
