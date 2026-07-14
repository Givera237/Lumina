import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPacksComponent } from './token-packs.component';

describe('TokenPacksComponent', () => {
  let component: TokenPacksComponent;
  let fixture: ComponentFixture<TokenPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenPacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
