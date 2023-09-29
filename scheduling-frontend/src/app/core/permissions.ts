/*  core/permisions.ts */


import { AdminUser } from "../admin/admin.interface";
import { Client } from "../client/client.interface";




export enum Permissions {
  AvailabilityRead = 'AvailabiltyRead',
  AvailabilityWrite = 'AvailabilityWrite',
  OwnClientMeetingRead = 'OwnClientMeetingRead',
  OwnClientMeetingWrite = 'OwnClientMeetingWrite',
  OwnClientProfileRead = 'OwnClientProfileRead',
  OwnClientProfileWrite = 'OwnClientProfileWrite',
  OwnClientPasswordWrite = 'OwnClientPasswordWrite',
  OwnClientPasswordRead = 'OwnClientPasswordRead',
  AllClientMeetingRead = 'AllClientMeetingRead',
  AllClientMeetingWrite = 'AllClientMeetingWrite',
  OwnAdminProfileRead = 'OwnAdminProfileRead',
  OwnAdminProfileWrite = 'OwnAdminProfileWrite',
  AllClientProfileRead = 'AllClientProfileRead',
  AllClientProfileWrite = 'AllClientProfileWrite',
  AllAdminProfileRead = 'AllAdminProfileRead',
  AllAdminProfileWrite = 'AllAdminProfileWrite',
  AllAmindMeetingWrite = 'AllAmindMeetingWrite',
  AllAmindMeetingRead = 'AllAmindMeetingRead',
  AllClientPasswordRead = 'AllClientPasswordRead',
  AllClientPasswordWrite = 'AllClientPasswordWrite',
  AlLAdminPasswordRead = 'AlLAdminPasswordRead',
  AlLAdminPasswordWrite = 'AlLAdminPasswordWrite'
  }


  export type UserRoles = 'admin_user' | 'admin_master' | 'client';

interface PermissionChecker {
  [key: string]: (userRole: UserRoles, user: AdminUser | Client, record: any) => boolean;
}

const permissionCheckers: PermissionChecker = {

  AvailabilityRead: (userRole) => {
    return ['client', 'admin_user', 'admin_master'].includes(userRole);
  },
  AvailabilityWrite: (userRole) => {
    return ['admin_user', 'admin_master'].includes(userRole);
  },

  OwnClientMeetingRead: (userRole, user, record) => {
    if (userRole === 'client' && 'client_username' in user) {
        return user.client_username === record.client_username;
    }
    return false;
},
OwnClientMeetingWrite: (userRole, user, record) => {
    if (userRole === 'client' && 'client_username' in user) {
        return user.client_username === record.client_username;
    }
    return false;
},
OwnClientProfileRead: (userRole, user, record) => {
    if (userRole === 'client' && 'client_username' in user) {
        return user.client_username === record.client_username;
    }
    return false;
},
OwnClientProfileWrite: (userRole, user, record) => {
    if (userRole === 'client' && 'client_username' in user) {
        return user.client_username === record.client_username;
    }
    return false;
},
OwnAdminProfileRead: (userRole, user, record) => {
    if (userRole === 'admin_user' && 'admin_username' in user) {
        return user.admin_username === record.admin_username;
    }
    return false;
},
OwnAdminProfileWrite: (userRole, user, record) => {
    if (userRole === 'admin_user' && 'admin_username' in user) {
        return user.admin_username === record.admin_username;
    }
    return false;
},


  AllClientMeetingRead: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
  AllClientMeetingWrite: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
 
  AllClientProfileRead: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
  AllClientProfileWrite: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
  
  AllAdminMeetingRead: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
  AllAdminMeetingWrite: (userRole) => {
    return userRole === 'admin_user' || userRole === 'admin_master';
  },
  
};

export function hasPermission(permission: Permissions, userRole: UserRoles, user: AdminUser | Client, record: any): boolean {
  const checker = permissionCheckers[permission];
  if (!checker) {
    throw new Error(`Permission ${permission} is not handled`);
  }

  // Admin master has no restriction
  if (userRole === 'admin_master') {
    return true;
  }

  return checker(userRole, user, record);
}

