import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { NextComponentType  } from 'next'
import { ThemeProvider } from 'next-themes'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // Adiciona tipagem para rotas protegidas.
}

const App = ({ Component, pageProps: {session, ...pageProps} }: CustomAppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
  <SessionProvider session={session}>
    <StoreProvider>
      <PayPalScriptProvider options={OPCOES_PROVIDER_PAYPAL} deferLoading={true}>
      {Component.auth ? (
        <Autenticacao>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </Autenticacao>
      ):(
      
      
      <Layout>
       <Component {...pageProps} />
      </Layout>
      )}
      </PayPalScriptProvider>
    </StoreProvider>
   </SessionProvider>
   </ThemeProvider>
  )
}
const OPCOES_PROVIDER_PAYPAL = {
	"client-id": "test",
};


function Autenticacao({ children }:any){
  const router = useRouter();
  const {status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/unauthorized?message=Login obrigatorio');
    }
  });
  if(status === 'loading'){
    return <div>Carregando...</div>
  }
  return children;
}

export default App
