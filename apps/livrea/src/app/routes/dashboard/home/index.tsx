import { Heading, Text, View } from "@philagora/ui";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Dropzone } from "@/components";

export default function Index() {
   return (
      <div>
         <div
            className={style({
               alignItems: "center",
               backgroundColor: "Background",
               borderColor: "Field",
               borderRadius: "lg",
               borderStyle: "dashed",
               borderWidth: 2,
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-evenly",
            })}>
            <div>
               <Heading level={4}>Getting Started</Heading>
               <Text textStyle={{ opacity: 0.7 }}>
                  Get started with one of the books below <br /> or import your epub file using the import button.
               </Text>
            </div>

            <Dropzone>
               <Text>test</Text>
            </Dropzone>
         </div>
         <Heading level={3}>Top Picks</Heading>
         <Text>Get started with one of the books below.</Text>
      </div>
   );
}
