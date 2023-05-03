API Endpoints:

1) Display the home page:
   a) Path: '' or 'home'
   b) Function: Renders the home component of the API where the user can view various grade distributions
2) Display the submission component form:
   a) Path: 'submissionform'
   b) Function: Renders the submission form component of the API where the user can submit grades
3) Fetch data for grades currently present in database for professor:
   a) Path: this.http.get<any>(url).subscribe((data: { [key: string]: string })
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.formData.year}/${this.formData.academicTerm}/${this.formData.major}/${this.formData.class}/${this.formData.professor.toLocaleLowerCase()}.json
   c) Function: Obtain grades from firebase that are currently present for a particular professor
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/submissionform/submissionform.component.ts#L40
4) Input new grade into the database
   a) Path: this.http.put(url, grades)
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.formData.year}/${this.formData.academicTerm}/${this.formData.major}/${this.formData.class}/${this.formData.professor.toLocaleLowerCase()}.json
   c) Function: Push grades from the submission form component into the firebase database
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/submissionform/submissionform.component.ts#L55
5) Fetch classes for a particular major:
   a) Path: this.http.get<any>(url).subscribe((data: { [key: string]: string })
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/.json
   c) Function: Obtain classes from firebase for a particular major
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/home/home.component.ts#L113
6) Fetch Professors for a particular class:
   a) Path: this.http.get<any>(url).subscribe((data: { [key: string]: string })
   b) URL: https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/${this.searchForm.get('class')!.value}/.json
   c) Function: Obtain the different professors teaching a particular class from Firebase
   d) Link to code: https://github.com/comp426-2023-spring/a99-RamVision/blob/b9df5dd135d0825bad789da7f9fc18677cdc9ddf/RamVision/src/app/home/home.component.ts#L132
