import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { createCA, createCert } from "mkcert";

/*
 * We create self-signed certificate to be able to set http-only cookies which are served for keeping refresh token
 *
 * !!!DO NOT CHANGE THIS FILE!!!
 * */

const ca = await createCA({
  organization: "Grid Dynamics",
  countryCode: "MD",
  state: "Moldova",
  locality: "Chisinau",
  validity: 365,
});

const cert = await createCert({
  ca: { key: ca.key, cert: ca.cert },
  domains: ["127.0.0.1", "localhost"],
  validity: 365,
});

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "public",
  server: {
    https: {
      key: cert.key,
      cert: cert.cert,
    },
    fs: {
      strict: false,
    },
  },
});
