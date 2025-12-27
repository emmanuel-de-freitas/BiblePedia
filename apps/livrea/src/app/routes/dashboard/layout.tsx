import myStore from "@/atoms/store";
import {Sidebar, TitleBar, Topbar} from "@/components";
import {style} from "@react-spectrum/s2/style" with {type: "macro"};
import {Provider} from "jotai";
import {LayoutGroup, motion} from "motion/react";
import {Outlet} from "react-router";

function DashboardLayout({ children }: { children: React.ReactNode }) {
   const dashboardStyle = style({
      display: "grid",
      gridTemplateColumns: "auto 2fr",
      gridTemplateRows: "100dvh",
      paddingEnd: 12,
      paddingStart: 4,
      rowGap: 12,
      backgroundColor: "layer-1",
      gridTemplateAreas: ["sidebar content content"],
   });

   const mainStyle = style({
      gridArea: "content",
      paddingTop: 64,
      display: "flex",
      flexDirection: "column",
      rowGap: 16,
   });

   const contentStyle = style({
      backgroundColor: "base",
      borderRadius: "xl",
      boxShadow: "emphasized",
      padding: 20,
      marginBottom: 12,
      height: "full",
   });

   return (
      <Provider store={myStore}>
         <LayoutGroup>
            <TitleBar />
            <motion.div layout className={dashboardStyle}>
               <Sidebar />
               <motion.main layout className={mainStyle}>
                  <Topbar />
                  <motion.div className={contentStyle}>
                     {children}
                     <Outlet />
                  </motion.div>
               </motion.main>
            </motion.div>
         </LayoutGroup>
      </Provider>
   );
}

export default DashboardLayout;
