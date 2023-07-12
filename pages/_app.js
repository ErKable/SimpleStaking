import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import ParticleBG from '../components/ParticleBG';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '2f8aebd2933be48537ef365d2c5ccf62',
  chains
});

const wagmiConfigz = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})



function MyApp({ Component, pageProps }) {
  return (    
    <WagmiConfig config={wagmiConfigz}>
      <RainbowKitProvider chains={chains} theme={darkTheme({accentColor: '#ff2753', accentColorForeground: 'black'})}>
        <Component {...pageProps} />
        <ParticleBG/>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
