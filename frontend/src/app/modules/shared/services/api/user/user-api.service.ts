import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  login(data: any){
    console.log("inner login");
    
    return this.apiService.post(environment.api.endpoints.user.login, data);
  }
}
