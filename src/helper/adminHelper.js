// MARK: connect functions

export function check_access(
  permissions,
  permission_name,
  sub_permission_name,
  level = 1
) {
  var access_level = 0;
  for (var permission of permissions) {
    if (permission.name === permission_name) {
      access_level = permission.access_level;
      for (var sub_permission of permission.sub_permissions)
        if (
          sub_permission.name === sub_permission_name &&
          sub_permission.access_level > access_level
        )
          access_level = sub_permission.access_level;
    }
  }
  return access_level >= level;
}
