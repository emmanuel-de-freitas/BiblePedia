import {style} from "@react-spectrum/s2/style" with {type: "macro"};
import {Provider} from "jotai";
import {LayoutGroup, motion} from "motion/react";
import myStore from "@/atoms/store";
import {Sidebar, TitleBar, Topbar} from "@/components";

function DashboardLayout({ children }: { children: React.ReactNode }) {
   const dashboardStyle = style({
      backgroundColor: "layer-1",
      display: "grid",
      gridTemplateAreas: ["sidebar content content"],
      gridTemplateColumns: "auto 2fr",
      gridTemplateRows: "100dvh",
      paddingEnd: 12,
      paddingStart: 4,
      rowGap: 12,
   });

   const mainStyle = style({
      display: "flex",
      flexDirection: "column",
      gridArea: "content",
      paddingTop: 64,
      rowGap: 16,
   });

   const contentStyle = style({
      backgroundColor: "base",
      borderRadius: "xl",
      boxShadow: "emphasized",
      height: "full",
      marginBottom: 12,
      padding: 24,
   });

   return (
      <Provider store={myStore}>
         <LayoutGroup>
            <TitleBar />
            <motion.div layout className={dashboardStyle}>
               <Sidebar />
               <motion.main layout className={mainStyle}>
                  <Topbar />
                  <motion.div className={contentStyle}>{children}</motion.div>
               </motion.main>
            </motion.div>
         </LayoutGroup>
      </Provider>
   );
}

export default DashboardLayout;
