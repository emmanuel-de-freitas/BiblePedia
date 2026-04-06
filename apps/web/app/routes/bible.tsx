import { Outlet } from "react-router";

export default function BibleLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bible Explorer</h1>
      <Outlet />
    </div>
  );
}
