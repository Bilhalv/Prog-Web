export default function Navbar({ titulo, logo }) {
  return (
    <nav className="bg-principal flex justify-between py-6 px-5 shadow-md sticky top-0 z-30 text-white">
      <h1 className="text-accent3 text-3xl mx-auto">{titulo}</h1>
      <img src={logo}
      />
    </nav>
  );
}
