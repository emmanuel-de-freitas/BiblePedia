import {useAsyncError, useAsyncValue} from "react-router";
import {style} from "@react-spectrum/s2/style";
import {Heading, Text} from "@philagora/ui";

const TopPicks = () => {
   const data = useAsyncValue();
   const error = useAsyncError();

   return (
      <div className={style({ marginTop: 24 })}>
         <Heading level={3}>Top Picks</Heading>
         <Text>Get started with one of the books below.</Text>
      </div>
   );
};

export default TopPicks;
