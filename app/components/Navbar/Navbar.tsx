import { SafeUser } from "@/app/types";

import Container from "../Container";
import Categories from "@/app/components/Navbar/Categories";
import Logo from "@/app/components/Navbar/Logo";
import Search from "@/app/components/Navbar/Search";
import UserMenu from "@/app/components/Navbar/UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div className="flex 
                          flex-row 
                          items-center 
                          justify-between
                          gap-3
                          md:gap-0
                          z-20"
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}


export default Navbar;