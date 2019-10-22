import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '@shared/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(
    public auth: AuthService,

  ) { }


  showSuccess(message: any){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    })
  }

  showError(message: any){
    Swal.fire({
      position: 'center',
      type: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000
    })
  }


  showWarning(message: any){
    let aa = this.auth;
    Swal.fire({
      position: 'center',
      type: 'warning',
      title: message,

      showCancelButton: false,
      confirmButtonColor: '#FBD702',
      cancelButtonColor: '#d33',
      confirmButtonText: '<b style="color:black;"> <h6 style="width:199px; ;height: 24px; border-radius: 8px; padding-top:8px;font-family: Montserrat;font-size: 20px; border:none;">SIGN IN</h6> </b>',
     footer: '<p style ="font-size:14px;font-family: Montserrat;">New to Kin?</p>' + ' ' +  `<a style= "color:#000000;margin-left:4px;font-family: Montserrat;font-size:14px;" href="/redirecting"> Create an account - it's free!!!</a>`,
    }).then((result) => {
      if (result.value) {
        this.auth.login();
        // window.location.href = "https://dev--ilicir1.auth0.com/login?state=g6Fo2SB4N25XRXphRDVpcWRvVnlROFpXYWE2VTZIMmVlOC1wM6N0aWTZIFVISndlT0E0cDJaR01tYVpKcXVSWUpHUjdLNHRkc2Roo2NpZNkgU0s5NzhEdW1GVjZQQWh4S05GZ00wZzh2a1pvTG94VU4&client=SK978DumFV6PAhxKNFgM0g8vkZoLoxUN&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&audience=https%3A%2F%2Fkin-dev-api-gateway&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=w_r3movoXMvzvezGxB6u_LjQxpigIxjZI1yegQI0YTH&code_challenge=zJ2mQ7QDRyfZTC0MZiWsFDMV5lm7B-ZI8W2vGSBAHfM&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMS4xIn0%3D";
      }
    })
  }

  


 delete(message: any){
  Swal.fire({
    title: 'Are you sure?',
    // text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  }


}
