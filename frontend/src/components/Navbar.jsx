import { navbarItems } from "@/lib/constants";

const Navbar = () => {
  return (
    <section className="px-11">
      <div className="w-full flex flex-row justify-between">
        <a href={"/"}>Mission to Mars!</a>

        <ul className="flex flex-row gap-5">
          {navbarItems.map((item) => (
            <li key={item.title}>
              <a href={`${item.url}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
