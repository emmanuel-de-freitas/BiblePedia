import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import Search from "./search";
import Heading from '@/ui/heading';

const Topbar = () => {
  const topbarStyle = style({
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    paddingTop: 24,
    justifyContent: 'space-between'
  });

  return (
    <div className={topbarStyle}>
      <Heading level={3}>Home</Heading>
      <Search />
    </div>
  );
};

export default Topbar;
