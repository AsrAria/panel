// MARK: project ui imports
import HomePage from "views/Home/HomePage.jsx";
import AdminList from "views/Admin/AdminList.jsx";
import UpdateProfile from "views/Admin/UpdateProfile.jsx";
import ChangePassword from "views/Admin/ChangePassword.jsx";
import UserList from "views/User/UserList.jsx";
import PersonList from "views/Person/PersonList.jsx";
import PsychiatristList from "views/Psychiatrist/PsychiatristList.jsx";
import OrganizationList from "views/Organization/OrganizationList.jsx";
import PaymentList from "views/Payment/PaymentList.jsx";

export const dashboardTable = admin => {
  var table = [
    [
      {
        visible: true,
        path: "/dashboard",
        name: "Home",
        icon: "home",
        component: HomePage
      }
    ]
  ];

  table.push([
    {
      visible: false,
      path: "/changePassword",
      name: "Change password",
      icon: "person",
      component: ChangePassword
    }
  ]);

  table.push([
    {
      visible: false,
      path: "/updateProfile",
      name: "Profile",
      icon: "person",
      component: UpdateProfile
    }
  ]);

  if (admin.hasReadPermission("admin")) {
    table.push([
      {
        visible: true,
        path: "/admin",
        name: "Admins",
        icon: "person",
        component: AdminList
      }
    ]);
  }

  if (admin.hasReadPermission("user", "user")) {
    table.push([
      {
        visible: true,
        path: "/user",
        name: "Users",
        icon: "account_box",
        component: UserList
      }
    ]);
  }

  if (admin.hasReadPermission("person", "person")) {
    table.push([
      {
        visible: true,
        path: "/person",
        name: "Persons",
        icon: "face",
        component: PersonList
      }
    ]);
  }

  if (admin.hasReadPermission("organization", "organization")) {
    table.push([
      {
        visible: true,
        path: "/organization",
        name: "Organizations",
        icon: "apartment",
        component: OrganizationList
      }
    ]);
  }

  if (admin.hasReadPermission("psychiatrist", "psychiatrist")) {
    table.push([
      {
        visible: true,
        path: "/psychiatrist",
        name: "Psychiatrists",
        icon: "payment",
        component: PsychiatristList
      }
    ]);
  }

  if (admin.hasReadPermission("user", "user")) {
    table.push([
      {
        visible: true,
        path: "/payment",
        name: "Payments",
        icon: "support_agent",
        component: PaymentList
      }
    ]);
  }

  table.push([
    {
      visible: false,
      redirect: true,
      path: "/",
      to: "/dashboard"
    }
  ]);
  return table;
};

export const dashboardRoutes = admin => {
  var dashboardRoutes = [];
  var table = dashboardTable(admin);
  for (var i of table) {
    for (var j of i) {
      if (Object.keys(j).length > 2) dashboardRoutes.push(j);
    }
  }
  return dashboardRoutes;
};
