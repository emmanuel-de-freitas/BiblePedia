import { Button, ButtonGroup, Content, DropZone, FileTrigger, Heading, IllustratedMessage } from "@react-spectrum/s2";
import CloudUpload from "@react-spectrum/s2/illustrations/gradient/generic1/CloudUpload";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type React from "react";
import { useState } from "react";

function Dropzone(props: React.ComponentProps<typeof DropZone>) {
   const [content, setContent] = useState<React.ReactNode>(null);
   return (
      <DropZone
         {...props}
         size="S"
         UNSAFE_style={{ borderWidth: 0 }}
         styles={style({ maxWidth: 320, width: "auto" })}
         isFilled={!!content}
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

            if (item?.kind === "text") {
               const text = await item.getText("text/plain");
               setContent(text);
            } else if (item?.kind === "file") {
               const file = await item.getFile();
               const url = URL.createObjectURL(file);
               setContent(<img src={url} alt={item.name} className={style({ maxHeight: "full", maxWidth: "full" })} />);
            }
         }}>
         {content || (
            <IllustratedMessage size="S" orientation="horizontal">
               <CloudUpload />
               <Heading>Drag and drop your file</Heading>
               <Content>Or, select a file from your computer</Content>
               <ButtonGroup>
                  <FileTrigger
                     acceptedFileTypes={["application/epub+zip"]}
                     onSelect={(files) => {
                        if (!files) return;
                        const url = URL.createObjectURL(files[0]);
                        setContent(
                           <img
                              src={url}
                              alt={files[0].name}
                              className={style({ maxHeight: "full", maxWidth: "full" })}
                           />,
                        );
                     }}>
                     <Button variant="primary">Browse files</Button>
                  </FileTrigger>
               </ButtonGroup>
            </IllustratedMessage>
         )}
      </DropZone>
   );
}

export default Dropzone;
