import { Component, Input, OnInit} from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  path:string=""
  title:string=""
  page:string ="1"
  nextPage:string ="2"
  prevPage:string ="0"
  fetchedData?:any
  
  openCharPortrait(id:string){
    window.open(`http://localhost:4200/${this.path}/${id}`, "_blank")
  }

  constructor(private apiCallService:ApiCallService, private route:ActivatedRoute){}

  
  ngOnInit():void{
    /*create observable streams for path and page-query */
    const path$ = this.route.paramMap.pipe(map(params => params.get('path')));
    const page$ = this.route.queryParamMap.pipe(map(params => params.get('page')));
    
    /*read data from url+query to fetch corresponding data from the api */
    combineLatest([path$, page$]).subscribe(([path, page]) => {  
      
      if(typeof path === "string"){
        this.path = path
        let dataObservable: Observable<any>|undefined =  this.apiCallService.fetchData(path, page?page:"1")
        if(page){
          this.nextPage = (parseInt(page)+1).toString()
          this.prevPage = (parseInt(page)-1).toString()
          
        }
        if(dataObservable){
          dataObservable.subscribe(response=>{
            if(response){
              this.fetchedData = response
            }
          })
        }
      }
    })
  }

  
    
  
}
