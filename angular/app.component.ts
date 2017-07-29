/*
  With an ng2/4 app you've got the choice of a hashing location strategy or pathlocation strategy.
  Hashlocation strategy is when you see the # in the url eg domain.com/#/page
  Pathlocation strategy removes that and relies on HTML5 push state
  Pathlocation typically looks prettier and more professional but the problem comes when you refresh the page or have a direct link. 
  In either case, you'll get a 404 - you need the server to redirect all requests to your index.html at the application root
  
  If you're hosting on something like S3, then you can leverage the routing rules engine to check for a 404 first and if found, send to another url.
  This allows the user to come in with domain.com/page - s3 looks for the route and can't find it, then redirects to domain.com/#/page, and the resolveHashUrl code below takes over.

  Example routing rule where you're running your site under a folder called 'path':
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>path/</KeyPrefixEquals>
      <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <Protocol>https</Protocol>
      <HostName>domain.com</HostName>
      <ReplaceKeyPrefixWith>path/#/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>

  
  some keywords: useHash: false 404 on refresh angular2 angular4 s3
*/

import {Component, Inject} from "@angular/core";
import {Location} from "@angular/common";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: []
})
export class AppComponent {
  constructor (@Inject(Location)location) {
    this.resolveHashURL(location);
  };
  resolveHashURL(location) {
    const hash = location._platformStrategy._platformLocation.hash;
    if (hash) {
      const path = hash.substring(1);
      // console.log('RedirectTo: ' + path);
      location.go(path);
    }
  }
}
