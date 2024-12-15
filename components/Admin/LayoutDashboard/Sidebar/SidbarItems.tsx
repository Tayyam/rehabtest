import HotelContract from "@/public/images/Icons/Sidebar/HotelContract.svg";
import HotelContractWhite from "@/public/images/Icons/Sidebar/HotelContractWhite.svg";
import City from "@/public/images/Icons/Sidebar/City.svg";
import Citywhite from "@/public/images/Icons/Sidebar/Citywhite.svg";
import SettingsMinimalistic from "@/public/images/Icons/Sidebar/SettingsMinimalistic.svg";
import SettingsMinimalisticwhite from "@/public/images/Icons/Sidebar/SettingsMinimalisticwhite.svg";
import User from "@/public/images/Icons/Sidebar/User.svg";
import UserWhite from "@/public/images/Icons/Sidebar/UserWhite.svg";
import Package from "@/public/images/Icons/Sidebar/Package.svg";
import PackageWhite from "@/public/images/Icons/Sidebar/PackageWhite.svg";
import PNR from "@/public/images/Icons/Sidebar/PNR.svg";
import PNRWhite from "@/public/images/Icons/Sidebar/PNRWhite.svg";
import Accountant from "@/public/images/Icons/Sidebar/Accountant.svg";
import MangePligrims from "@/public/images/Icons/Sidebar/MangePligrims.svg";
import MangePligrimsWhite from "@/public/images/Icons/Sidebar/MangePligrimsWhite.svg";
import HotelAccommodation from "@/public/images/Icons/Sidebar/HotelAccommodation.svg";
import HotelAccommodationWhite from "@/public/images/Icons/Sidebar/HotelAccommodationWhite.svg";
type Props = {
  lang: "en" | "ar";
};

function SidbarItems({ lang }: Props) {
  return [
    {
      icon: SettingsMinimalistic,
      iconActive: SettingsMinimalisticwhite,
      label: lang === "en" ? "Platform Management" : "ادارة المنصه",
      href: `/${lang}/admin/platform-management`,
      permission: "admin",
    },
    {
      icon: City,
      iconActive: Citywhite,
      label: lang === "en" ? "Company" : "شركة",
      href: `/${lang}/admin/company`,
      permission: "admin",
    },
    {
      icon: User,
      iconActive: UserWhite,
      label: lang === "en" ? "Users" : "المستخدمين",
      href: `/${lang}/admin/users`,
      permission: "company",
    },
    {
      icon: HotelContract,
      iconActive: HotelContractWhite,
      label: lang === "en" ? "Hotel Contract" : " عقد الفندق ",
      permission: "company",
      children: [
        {
          label: lang === "en" ? "Hotel" : "الفندق",
          href: `/${lang}/admin/hotels`,
        },
        {
          label: lang === "en" ? "Contracts" : "العقود",
          href: `/${lang}/admin/contracts`,
        },
        {
          label: lang === "en" ? "Contracts Resources" : "موارد العقود",
          href: `/${lang}/admin/contracts-resources`,
        },
      ],
    },
    {
      icon: Package,
      iconActive: PackageWhite,
      label: lang === "en" ? "Package" : " حزمه ",
      permission: "company",
      children: [
        {
          label: lang === "en" ? "Add Package" : "اضافه حزمه",
          href: `/${lang}/admin/add-package`,
        },
        {
          label: lang === "en" ? "Add Package Details" : " اضافه تفاصيل حزمه",
          href: `/${lang}/admin/add-package-details`,
        },
        {
          label: lang === "en" ? "Package Show" : "عرض حزمه",
          href: `/${lang}/admin/package-show`,
        },
      ],
    },

    {
      icon: PNR,
      iconActive: PNRWhite,
      label: lang === "en" ? "PNR" : " PNR ",
      permission: "company",
      children: [
        {
          label: lang === "en" ? "Add PNR" : "اضافه PNR",
          href: `/${lang}/admin/add-pnr`,
        },
        {
          label: lang === "en" ? "Install PNR" : "تثبيت PNR",
          href: `/${lang}/admin/install-pnr`,
        },
      ],
    },

    {
      icon: MangePligrims,
      iconActive: MangePligrimsWhite,
      label: lang === "en" ? "Mange Pligrims" : "ادارة العملاء",
      permission: "company",
      children: [
        {
          label: lang === "en" ? "Upload Pligrims" : "رفع العملاء",
          href: `/${lang}/admin/upload-pligrims`,
        },

        {
          label: lang === "en" ? "add organizer" : " اضافه موظف",
          href: `/${lang}/admin/add-organizer`,
        },
        {
          label: lang === "en" ? "Add guide" : " اضافه رائد",
          href: `/${lang}/admin/add-guide`,
        },
        {
          label: lang === "en" ? "Assign pilgrims" : " تخصيص العملاء",
          href: `/${lang}/admin/assign-pilgrims`,
        },
        {
          label: lang === "en" ? "Assignment confirmation" : " تاكيد التخصيص",
          href: `/${lang}/admin/assignment-confirmation`,
        },
        {
          label: lang === "en" ? "Guides dispute" : "قضايا الرائد",
          href: `/${lang}/admin/guides-dispute`,
        },
      ],
    },
    {
      icon: HotelAccommodation,
      iconActive: HotelAccommodationWhite,
      label: lang === "en" ? "Hotel Accommodation" : " غرف الفندق",
      href: `/${lang}/admin/hotels-accommodation`,
      permission: "company",
    },
  ];
}

export default SidbarItems;
