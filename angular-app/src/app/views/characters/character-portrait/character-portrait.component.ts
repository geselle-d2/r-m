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
  
  characterDetails:any
  charSpecificEpisodes:any

  id:string=""
  path:string=""
  
  constructor(private route:ActivatedRoute, private apiCallService:ApiCallService, private router:Router){}
  
  /*goToLink(url:string){window.open(url)}*/
  
  back(){
    this.router.navigateByUrl("/character")
  }  

  ngOnInit():void {
    this.route.params.subscribe((params)=>{
      this.id = params['id']
      this.path= "character"
      /*fetch a specific character by id */
      let characterObservable: Observable<any> = this.apiCallService.fetchDetailedData(this.path, this.id)
      characterObservable.subscribe(character => {
        if(character){
          this.characterDetails=character
          let episodeObservable : Observable<any>|undefined= this.apiCallService.fetchAppearencesData(this.characterDetails.episode, "episode")
          if(episodeObservable){
            episodeObservable.subscribe(episodes=> {
              if(episodes){
                  this.charSpecificEpisodes= Array.isArray(episodes)? episodes : [episodes];
                  console.log(this.charSpecificEpisodes)
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