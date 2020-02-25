import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, } from "@angular/material";
import { AirtableService } from '../../../shared/service/airtable.service';
import { UserService } from '../../../shared/service/user.service';
import { User } from '../../../shared/model/user';
import { RecosConstants } from "@shared/constants/CommonConstants";
import { AuthService } from '../../../shared/service/auth.service';
import { Observable } from 'rxjs';

declare let ga: any;

@Component({
  selector: 'app-recos-listing',
  templateUrl: './recos-listing.component.html',
  styleUrls: ['./recos-listing.component.css']
})
export class RecosListingComponent implements OnInit {

  data_list;
  isExplore = false;
  public friends: string[];
  public recommenders = new Object();
  public user: User;
  public category: string;
  public locations: any;
  public recosConstants = new RecosConstants();
  public categoryList = this.recosConstants.RECOS_CATEGORY;
  public recos: any;
  showMore = false;
  showCommunity = false;
  showTrusted = false;
  showYours = false;
  start = 0;
  end = 100;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public errorMessage: String;
  count = 0;
  public isAuthenticated$: Observable<boolean>;
  isLoggedin = false;
  

  entity_type: string;
  display_entity_type: string;
  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private airtableService: AirtableService, 
              private userService: UserService,
              private authService: AuthService) {
                this.isAuthenticated$ = this.authService.isAuthenticated$;
                this.isAuthenticated$.subscribe(data => {
                  this.isLoggedin = data;
                })
              }
              

  ngOnInit() {
    this.recos = {
      'friends': [],
      'community': [],
      'trusted': [],
      'yours': []
    }
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isAuthenticated$.subscribe(data => {
      this.isLoggedin = data;
      this.authService.setAuth(this.isLoggedin);
      });
      
    this.entity_type = this.route.snapshot.params['id'];
    this.airtableService.getRecommenderNames().subscribe(data => {
      for(var idx in data['records']) {
        var rec = data['records'][idx];
        this.recommenders[rec.id] = rec.fields.Name;
      }
    });
    this.userService.getUser().subscribe((user) => {
        this.user = user;
        this.get_friends();
        
    });

    setTimeout(() => {
      this.showCommunity = true;
    }, 3000);


    setTimeout(() => {
      this.showYours = true;
    }, 5000);
    

    setTimeout(() => {
      this.showTrusted = true;
    }, 6000);

  }

  get_friends() {
    this.airtableService.getFriends(this.user.parent.parent_id).subscribe(data => {
      this.friends = data['records'][0].fields.Friends.split(",");
      this.get_recos(this.entity_type, this.friends);
    });

  }

  get_recos(entity_type: string, friends_list: string[]) {
    var airtable_category = this.categoryList.filter(function(item) {
      return item.name === entity_type;
    })[0];
    this.category = airtable_category.name;
    this.airtableService.getRecosByCategory(airtable_category.category).subscribe(data => {
          for(var idx in data['records']) {
            var rec = data['records'][idx];
            if (friends_list.indexOf(rec.fields.Recommender) > -1 ) {
                this.recos.friends.push(rec);
            } else {
                if (rec.fields.hasOwnProperty('KinId') 
                    && parseInt(this.user.parent.parent_id) === rec.fields.KinId) {
                  this.recos.yours.push(rec);
                } else {
                  this.recos.community.push(rec);
                }
            } 
          }
          if (entity_type === 'toys') {
              this.airtableService.getToys().subscribe(data => {
                for(var idx in data['records']) {
                  var rec = data['records'][idx];
                  for (var recommender in rec.fields.RecommendedBy) {
                    rec.fields.RecommendedBy[recommender] = this.recommenders[rec.fields.RecommendedBy[recommender]];
                  }
                  this.recos.trusted.push(rec);
                }
              });
          } else if(entity_type === 'books') {
              this.airtableService.getBooks().subscribe(data => {
                for(var idx in data['records']) {
                  var rec = data['records'][idx];
                  for (var recommender in rec.fields.RecommendedBy) {
                    rec.fields.RecommendedBy[recommender] = this.recommenders[rec.fields.RecommendedBy[recommender]];
                  }
                  this.recos.trusted.push(rec);
                }
            });
          }
    });
  }

}
