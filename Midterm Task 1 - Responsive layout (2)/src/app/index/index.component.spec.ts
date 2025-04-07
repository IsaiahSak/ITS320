import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty newQuote', () => {
    expect(component.newQuote.author).toBe('');
    expect(component.newQuote.quote).toBe('');
    expect(component.newQuote.date).toBe('');
    expect(component.quotes.length).toBe(0);
  });
});
