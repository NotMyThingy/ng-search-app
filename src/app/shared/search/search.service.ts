import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data/people.json');
  }

  search(q: string): Observable<Person[]> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: Person[]) =>
        data.filter((item: Person) =>
          JSON.stringify(item).toLowerCase().includes(q)
        )
      )
    );
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj?.street || null;
    this.city = obj?.city || null;
    this.state = obj?.state || null;
    this.zip = obj?.zip || null;
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.name = obj?.name;
    this.phone = obj?.phone;
    this.address = obj?.address;
  }
}
