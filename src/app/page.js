const logo = "/logo.jpg";
import { navItems } from "@/constants/constant.js";
import CardNav from "../components/CardNav.jsx"

const App = () => {
  
  return (
    <CardNav
      logo={logo}
      logoAlt="UrbanSlay"
      items={navItems}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      theme="color"
    />
  );
};

export default App;