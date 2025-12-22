import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import NavButton from "./ui/nav-button";
import Text from "./ui/text";
import Home from '@react-spectrum/s2/icons/Home';

const Navbar = () => {

  return (
    <nav>
      <NavButton icon={<Home />}>
        <Text>Home</Text>
      </NavButton>
    </nav>
  );
};

export default Navbar;
