## API Endpoints: (Root API: /app)
   
1) Fetch data for grades currently present in database for professor:  
   a) Path: app.get('/app/grades')  
   b) Function: Obtain grades from firebase that are currently present for a particular professor   
2) Input new grade into the database  
   a) Path: app.post('/app/add/:year/:semester/:major/:course/:prof/:grade')  
   b) Function: Accept a class and a grade, and adds the grade to that class in the database
3) Delete grades from the database  
   a) Path: app.delete ('/app/delete/:year/:semester/:major/:course/:prof/:grade')  
   b) Function: Accepts a class and a grade, and deletes that grade from the class in the database. 
   
4) Fetch classes for a particular major:(Not done using Express API)
   a) Path: this.http.get<any>(url).subscribe((data: { [key: string]: string })  
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/.json  
   c) Function: Obtain classes from firebase for a particular major  
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/home/home.component.ts#L113  
  
5) Fetch Professors for a particular class: (Not done using Express API)
   a) Path: this.http.get<any>(url).subscribe((data: { [key: string]: string })  
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/${this.searchForm.get('class')!.value}/.json  
   c) Function: Obtain the different professors teaching a particular class from Firebase  
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/home/home.component.ts#L132
   
Components of the Web page were not displayed using an API and the API was only used to obtain data from the backend firebase database
