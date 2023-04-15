import { HttpHeaders } from "@angular/common/http";


export const JsonOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const FormDataOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    
  })
};