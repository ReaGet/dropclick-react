import { useNavigate } from "react-router-dom";
import { Select } from "components/ui/Select";
import { useAuth } from "hooks/useAuth";

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuOptions = [
    { value: "/account", title: "Личный кабинет", },
    { value: "/settings", title: "Настройки", },
    { value: "/logout", title: "Выход", },
  ];

  const handleDropdownClick = (value) => {
    if (value === "/logout") {
      logout();
      value = "/";
    }
    navigate(value, {
      replace: true
    });
  };

  return (
    <Select
      options={menuOptions}
      justify={"right"}
      hideOnChange={false}
      onChange={handleDropdownClick}
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0B0B0B] hover:bg-[#272727] cursor-pointer transition-all z-10">
        <svg className="fill-white" width="24" height="24">
          <use xlinkHref="/assets/icons/sprites.svg#profile"></use>
        </svg>
      </div>
    </Select>
  );
}