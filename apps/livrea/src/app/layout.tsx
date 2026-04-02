

import { Provider } from "./provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <Provider>
      <body>{children}</body>
    </Provider>
  );
}
