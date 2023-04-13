import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  API_URL:String = "https://rickandmortyapi.com/api"
  
  
  constructor(private http:HttpClient) { }

  

/*service that fetches character, episode, location data from the api. the api answers in batches of 20.
first param specifies character etc. second parameter the batch. e.g. page 2: fetches 20-39 */
  fetchData(t1:string, page="1"):Observable<any>|undefined{
    try{
      return page=="1"? this.http.get(`${this.API_URL}/${t1}`)
      :this.http.get(`${this.API_URL}/${t1}?page=${page}`)
    }
    catch(error){
      console.log("error called")
      return undefined
    }
  }
/*fetches detailed data about a specific episode/character/location by id */
  fetchDetailedData(chaLocEpi:string, id:string){
    console.log(`fetchDetailedData calling: ${this.API_URL}/${chaLocEpi}/${id}`)
    return this.http.get(`${this.API_URL}/${chaLocEpi}/${id}`)
  }


  /*this function requests data depending on a list it receives and a type. 
  id is either the location, episode or character
  the list consists either of episodes, in which characters appear, characters and the episodes they appear in and 
  and a list of characters which reside in a specific location  */
  fetchAppearencesData(dataList:String[], type:string){
    /*extracting the numbers after the last "/" of each dataList entry */
  
    let filteredList= []
    for (let item in dataList){
      let sliceIndex = dataList[item].lastIndexOf("/", dataList[item].length)+1
      filteredList.push(dataList[item].slice(sliceIndex))
    }
    console.log("fetchAppearencesData calling :"+`${this.API_URL}/${type}/`+filteredList)
    return this.http.get(`${this.API_URL}/${type}/`+filteredList)
  }
}


