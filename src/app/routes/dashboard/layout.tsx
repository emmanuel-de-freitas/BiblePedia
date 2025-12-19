import { Topbar, Sidebar } from "@/components";
import { containerStyle } from "@/styles/content";
import { style } from "@react-spectrum/s2/style" with { type: 'macro' }

function DashboardLayout({ children }: { children: React.ReactNode }) {

  const contentStyle = style({
    display: 'flex',
    height: 'screen',
    backgroundColor: 'layer-2'
  });

  return (
    <div className={contentStyle}>
      <Sidebar />
      <main className={containerStyle}>
        <Topbar />
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;
