import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <main className="py-3 ml-20">
        <Outlet />
      </main>
    </>
  );
}
