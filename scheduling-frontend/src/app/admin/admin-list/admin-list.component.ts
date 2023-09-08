import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  adminUsers: any[] = []; /*Initialize with an empty array*/

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdminUsers();
  }

  loadAdminUsers(): void {
    this.adminService.getAllAdminUsers().subscribe(
      (data) => {
        this.adminUsers = data;
      },
      (error) => {
        console.error('Error loading admin users:', error);
      }
    );
  }
}
