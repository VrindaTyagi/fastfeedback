import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import { ChakraProvider, ColorModeProvider} from "@chakra-ui/react";
import theme from "@/styles/theme";
// import { Global, css } from '@emotion/core';

// const GlobalStyle = ({ children }) => {
//   return (
//     <>
//       <Head>
//         <meta content="width=device-width, initial-scale=1" name="viewport" />
//       </Head>
//       <CSSReset />
//       <Global
//         styles={css`
//           html {
//             scroll-behavior: smooth;
//           }
//           #__next {
//             display: flex;
//             flex-direction: column;
//             min-height: 100vh;
//           }
//         `}
//       />
//       {children}
//     </>
//   );
// };

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <ColorModeProvider options={{
        useSystsemColorMode: true
      }}>
      {/* <GlobalStyle /> */}
        <Component {...pageProps} />
        </ColorModeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
