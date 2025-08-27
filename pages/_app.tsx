import type { AppProps } from 'next/app';
// Redux
import { Provider } from 'react-redux';
import { store } from '@/store';
// Components
import Navigation from '@/components/Navigation';
// CSS (styles)
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}