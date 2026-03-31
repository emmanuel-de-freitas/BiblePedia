"use client";

import {
   Button,
   ButtonGroup,
   Content,
   DropZone,
   FileTrigger,
   Heading,
   IllustratedMessage,
   Image,
} from "@react-spectrum/s2";
import CloudUpload from "@react-spectrum/s2/illustrations/gradient/generic2/DropToUpload";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ComponentProps } from "react";
import useTheme from "@/hooks/useTheme";

function Dropzone(props: ComponentProps<typeof DropZone>) {
   const { isDark } = useTheme();

   const styles = style({
      alignItems: "center",
      backgroundColor: {
         default: "silver-subtle",
         isDark: "layer-2",
      },
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      paddingX: 20,
      paddingY: 40,
      width: "full",
   });

   return (
      <DropZone
         {...props}
         size="S"
         styles={style({ width: "full" })}
         isFilled={props.isFilled ?? false}
         UNSAFE_style={{
            overflow: "hidden",
            padding: 0,
         }}
         // Determine whether dragged content should be accepted.
         getDropOperation={(types) =>
            // Accept ebook formats only.
            ["application/epub+zip"].some((t) => types.has(t)) ? "copy" : "cancel"
         }
         onDrop={async (event) => {
            // Find the first accepted item.
            const item = event.items.find(
               (item) =>
                  (item.kind === "text" && item.types.has("text/plain")) ||
                  (item.kind === "file" && item.type.startsWith("image/")),
            );

            if (item?.kind === "file") {
               const file = await item.getFile();
               const url = URL.createObjectURL(file);
            }
         }}>
         <div className={styles({ isDark: isDark })}>
            <div
               className={style({
                  position: "relative",
                  width: 196,
               })}>
               <Image
                  src={"/book-stacked.png"}
                  alt="Book stacked illustration"
                  styles={style({
                     backgroundColor: "transparent",
                     position: "absolute",
                     rotate: 8,
                     scale: 2,
                     translateX: -64,
                     translateY: -48,
                  })}
               />
            </div>

            {props.children}
            <IllustratedMessage size="S" orientation="horizontal">
               <CloudUpload />
               <Heading>Drag and drop your ePub</Heading>
               <Content>Or select the file from your computer</Content>
               <ButtonGroup>
                  <FileTrigger
                     acceptedFileTypes={["application/epub+zip"]}
                     onSelect={(files) => {
                        if (!files) return;
                        const url = URL.createObjectURL(files[0]);
                     }}>
                     <Button variant="primary">Browse</Button>
                  </FileTrigger>
               </ButtonGroup>
            </IllustratedMessage>
         </div>
      </DropZone>
   );
}

export default Dropzone;
