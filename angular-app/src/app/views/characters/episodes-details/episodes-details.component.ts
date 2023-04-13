import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes-details',
  templateUrl: './episodes-details.component.html',
  styleUrls: ['./episodes-details.component.css']
})
export class EpisodesDetailsComponent implements OnInit{
  list:string[] = ["1","2","3"]
  dummy = {
  name:"testname",
  air_date: "2134",
  characters:["2","3"]
  
  }
  episodeDetails:any
  appearingChars:any
  id:string=""
  path:string=""

  constructor(private route:ActivatedRoute, private apiCallService:ApiCallService, private router:Router){}

  ngOnInit(): void {
    
    this.route.params.subscribe((params)=>{
      this.id = params['id']
      this.path= "episode"
      /*fetch a specific character by id */
      let characterObservable: Observable<any> = this.apiCallService.fetchDetailedData(this.path, this.id)
      characterObservable.subscribe(character => {
        if(character){
          this.episodeDetails=character
          let episodeObservable : Observable<any>|undefined= this.apiCallService.fetchAppearencesData(this.episodeDetails.characters, "character")
        
          if(episodeObservable){
            episodeObservable.subscribe(episodes=> {
              if(episodes){
                  this.appearingChars= Array.isArray(episodes)? episodes : [episodes];
                  console.log(this.appearingChars)
                }
            })
        
          } 
        }
      })
    })
  }
}
