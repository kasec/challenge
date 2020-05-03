import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { RestApiService } from "../rest-api-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User = {
    name: "Windstorm",
    password: "buu",
    token: "",
  };

  constructor(private restApiService: RestApiService, private router: Router) {}
  submit() {
    this.restApiService.auth(this.user).subscribe((user) => {
      if (user.token) {
        localStorage.setItem("token", user.token);
        this.router.navigate(["home"]);
      }
    });
  }
  ngOnInit() {}
}
