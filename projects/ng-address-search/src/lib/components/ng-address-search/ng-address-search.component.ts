import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  AddressAPIResult,
  DataGouvHttpService,
} from '../../services/data-gouv-http.service';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ViewEncapsulation } from '@angular/compiler';

@Component({
  selector: 'ng-address-search',
  templateUrl: './ng-address-search.component.html',
  styleUrls: ['./ng-address-search.component.css'],
  providers: [
    DataGouvHttpService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DataGouvHttpService,
      multi: true,
    },
  ],
})
export class NgAddressSearchComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  onChange = (value: any) => {};
  onBlur: any;

  adresseForm: FormGroup;

  @Input() placeholder = '';
  @Input() requiredValidatorMsg = "Veuillez entrer l'adresse";
  id = 'ng-address-search-component-' + new Date().getTime();

  protected listAddresses$: Subject<AddressAPIResult[]> = new Subject();

  listAddresses: Observable<AddressAPIResult[]> =
    this.listAddresses$.asObservable();

  @ViewChild('elSearchAddress', { static: false }) elSearchAddress: ElementRef;

  isLoading: Subject<boolean> = new Subject();

  // Memory leak prevention
  protected ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    protected service: DataGouvHttpService,
    private formBuilder: FormBuilder
  ) {}

  @HostListener('change', ['$event.target.value']) change(value: any) {
    if (!this.adresseForm.controls['latitude'].value) {
      this.onChange('');
    }
  }

  createAdresseForm() {
    this.adresseForm = this.formBuilder.group({
      adresse: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', [Validators.required]],
    });
  }
  writeValue(value: any): void {
    if (value == null || value == '') {
      this.adresseForm.controls['adresse'].setValue('');
      this.adresseForm.controls['longitude'].setValue('');
      this.adresseForm.controls['latitude'].setValue('');
    } else this.adresseForm.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.createAdresseForm();
  }

  ngAfterViewInit(): void {
    fromEvent(this.elSearchAddress.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((_: any) => this.isLoading.next(true)),
        map((event: Event) => (event.currentTarget as HTMLInputElement).value),
        debounceTime(100),
        switchMap((data) => {
          return this.service.search(data);
        }),
        tap(() => this.isLoading.next(false)),
        tap(() => {
          this.adresseForm.controls['longitude'].setValue('');
          this.adresseForm.controls['latitude'].setValue('');
        })
      )
      .subscribe((data: AddressAPIResult[]) => {
        this.listAddresses$.next(data);
      });
  }

  // clean memory
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectAddress(adresseResult: AddressAPIResult) {
    // change value of the input
    // this.elSearchAddress.nativeElement.value = address.properties.label;
    this.adresseForm.controls['adresse'].setValue(
      adresseResult.properties.label
    );
    this.adresseForm.controls['latitude'].setValue(
      adresseResult.geometry.coordinates[1]
    );
    this.adresseForm.controls['longitude'].setValue(
      adresseResult.geometry.coordinates[0]
    );
    this.onChange(this.adresseForm.value);
    // clear the list
    this.listAddresses$.next([]);
  }

  isInvalid() {
    return (
      (this.adresseForm.controls['adresse'].invalid ||
        this.adresseForm.controls['latitude'].invalid) &&
      this.adresseForm.controls['adresse'].touched
    );
  }

  isError(form: any, field: any, error: any) {
    return (
      form.controls[field].errors &&
      form.controls[field].errors[error] &&
      (form.controls[field].dirty || form.controls[field].touched)
    );
  }
}
