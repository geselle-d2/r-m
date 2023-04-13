import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-portrait',
  templateUrl: './character-portrait.component.html',
  styleUrls: ['./character-portrait.component.css']
})
export class CharacterPortraitComponent implements OnInit {
  
  elements:any
  secondaryElements:any


  id:string=""
  path:string=""
  secondaryData:string=""
  secondaryDataKey:string=""
  constructor(private route:ActivatedRoute, private apiCallService:ApiCallService, private router:Router){}
  
  /*goToLink(url:string){window.open(url)}*/
  
  back(){
    this.router.navigateByUrl("/character")
  }  

  ngOnInit():void {
    this.route.params.subscribe((params)=>{
      this.id = params['id']
      this.path= params['path']
      /*switch statement, which decides which further information will be passed down to the api call  */
      switch(this.path){
        case "character":
          this.secondaryData="episode";
          this.secondaryDataKey="episode"
          break;
        case "location":
          this.secondaryData="character";
          this.secondaryDataKey="residents"
          break;
        case "episode":
          this.secondaryData="character";
          this.secondaryDataKey="characters"
      }
      console.log("curret key is: "+this.secondaryDataKey)
      /*fetch a specific character by id */
      let responseObservable: Observable<any> = this.apiCallService.fetchDetailedData(this.path, this.id)
      responseObservable.subscribe(response => {
        if(response){
          this.elements=response;
          console.log(response)
          let secondObservable : Observable<any>|undefined= this.apiCallService.fetchAppearencesData(this.elements[this.secondaryDataKey], this.secondaryData)
          if(secondObservable){
            secondObservable.subscribe(secondResponse=> {
              if(secondResponse){
                  this.secondaryElements= Array.isArray(secondResponse)? secondResponse : [secondResponse];
                }
            })
        
          } 
        }
      })
    })
  }
  
}

/* nesting subscribe is bad coding practice. chatgpz suggests the following approach using switchmap
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

export class MyComponent {
  constructor(private http: HttpClient) {}

  sendGetRequest() {
    this.http.get('https://api.example.com/data').pipe(
      switchMap(data => {
        // Use the data from the first request to make a second request
        return this.http.get(`https://api.example.com/data/\${data.id}`);
      })
    ).subscribe(result => {
      console.log(result);
    });
  }
} */