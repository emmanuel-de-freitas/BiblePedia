import { Topbar, Sidebar, TitleBar } from "@/components";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
function DashboardLayout({ children }: { children: React.ReactNode }) {

  const dashboardStyle = style({
    display: 'grid',
    gridTemplateColumns: 'auto 2fr',
    gridTemplateRows: '100dvh',
    paddingX: 12,
    gap: 12,
    backgroundColor: 'layer-1',
    gridTemplateAreas: [
      'sidebar content content'
    ],
  });

  const mainStyle = style({
    gridArea: 'content',
    paddingTop: 56,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12
  });

  const contentStyle = style({
    backgroundColor: 'base',
    borderRadius: 'xl',
    boxShadow: 'emphasized',
    padding: 20,
    marginBottom: 12,
    height: 'full'

  });

  return (
    <>
      <TitleBar />
      <div className={dashboardStyle}>
        <Sidebar />
        <main className={mainStyle}>
          <Topbar />
          <div className={contentStyle}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
