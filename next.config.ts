import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Guarantees the embedded PDF fonts are bundled into the serverless
  // function — they're loaded via a runtime `path.join(process.cwd(), ...)`
  // read, which file-tracing can miss without an explicit include.
  outputFileTracingIncludes: {
    "/api/recipe/pdf": ["./src/lib/pdf/fonts/**"],
  },
};

export default nextConfig;
