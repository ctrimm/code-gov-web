import { APP_BASE_HREF } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AutocompleteComponent } from '../autocomplete';
import { AutocompleteResultComponent } from '../autocomplete-result';
import { ReposSearchComponent } from './';
import { ClientService } from '../../services/client';

class MockRouter {
  url: string;
  routerState: Object;
  events: Observable<any>;

  constructor() {
    this.url = '/explore-code/';
    this.routerState = {
      route: '/'
    };
    this.events = Observable.of([]);
  }

  navigateByUrl() {
    return true;
  }
}

describe('ReposSearchComponent', () => {

  let mockRouter: any;


  beforeEach(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        AutocompleteComponent,
        AutocompleteResultComponent,
        ReposSearchComponent
      ],
      imports: [
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ClientService,
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    });

    this.fixture = TestBed.createComponent(ReposSearchComponent);
    this.reposSearchComponent = this.fixture.componentInstance;
  });

  describe('onSubmit', () => {
    it('should call the search function', () => {
      spyOn(this.reposSearchComponent, 'search');
      this.reposSearchComponent.queryValue = 'GSA';

      this.reposSearchComponent.onSubmit();

      expect(this.reposSearchComponent.search).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should navigate to results page',
      inject([Router], router => {
        let query = 'GSA';
        spyOn(router, 'navigateByUrl');
        this.reposSearchComponent.queryValue = query;
        this.reposSearchComponent.search();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/search?q=' + query);
      }));
  });
});
