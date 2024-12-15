"use client";

import React from "react";
import Switch from "@/components/shared/Switch/Switch";

interface UserRole {
  type: string;
  permissions: {
    show: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}

type Props = {
  roles: UserRole[];
  togglePermission: (
    roleIndex: number,
    permission: keyof UserRole["permissions"]
  ) => void;
};

function UserRolesTab({ roles, togglePermission }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-4 bg-gray text-secondaryColor h-[60px] rounded-t-[12px] items-center font-medium">
        <div className="col-span-2 px-4">Type</div>
        <div>Show</div>
        <div>Add</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      {roles.map((role, index) => (
        <div
          key={role.type}
          className="grid grid-cols-6 text-secondaryColor border-[#F5F5F7] border-b h-[60px] gap-4 items-center"
        >
          <div className="col-span-2">{role.type}</div>
          {(
            Object.keys(role.permissions) as Array<
              keyof typeof role.permissions
            >
          ).map((key) => (
            <div key={key}>
              <Switch
                checked={role.permissions[key]}
                onCheckedChange={() => togglePermission(index, key)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserRolesTab;
