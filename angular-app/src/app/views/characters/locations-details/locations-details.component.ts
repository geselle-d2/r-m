import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations-details.component.html',
  styleUrls: ['./locations-details.component.css']
})
export class LocationsDetailsComponent implements OnInit{

  locationDetails:any
  locSpecificChars:any
  id:string=""
  path:string=""

  back(){
    this.router.navigateByUrl("/location")
  }  
  
  constructor(private route:ActivatedRoute, private apiCallService:ApiCallService, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = params['id']
      //this.path= params['path']
      this.path="location"
      /*fetch a specific character by id */
      let locationObservable: Observable<any> = this.apiCallService.fetchDetailedData(this.path, this.id)
      locationObservable.subscribe(location => {
        if(location){
          this.locationDetails=location
          console.log(this.locationDetails.residents)
          let locationObservable : Observable<any>|undefined= this.apiCallService.fetchAppearencesData(this.locationDetails.residents, "character")
        
          if(locationObservable){
            locationObservable.subscribe(location=> {
              if(location){
                  this.locSpecificChars= Array.isArray(location)? location : [location];
                  console.log(this.locSpecificChars)
                }
            })
        
          } 
        }
      })
    })
  }
}
