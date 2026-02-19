{
  description = "foss.compare - Self-hosted Software Comparison Tool";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js Environment
            nodejs_20

            # Package Manager (npm comes with nodejs, but explicitly listing alternative if needed)
            # yarn
            # pnpm

            # Build Tools & Utilities
            jq                # JSON processing
            git               # Version control

            # Testing
            playwright-driver # For Playwright

            # Linters & Formatters
            # (ESLint/Prettier are usually devDependencies in package.json)
          ];

          shellHook = ''
            echo "╔════════════════════════════════════════════╗"
            echo "║         foss.compare - Development         ║"
            echo "╚════════════════════════════════════════════╝"
            echo ""
            echo "Available tools:"
            echo "  node           - Node.js $(node --version)"
            echo "  npm            - NPM $(npm --version)"
            echo "  jq             - JSON Processor"
            echo ""
            echo "Getting started:"
            echo "  1. Install dependencies: npm install"
            echo "  2. Start dev server:     npm run dev"
            echo "  3. Build for prod:       npm run build"
            echo "  4. Lint code:            npm run lint"
            echo ""
            echo "Playwright:"
            echo "  - Run 'npx playwright install' to ensure browsers are downloaded."
            echo ""

            # Set Playwright to use the system driver if needed, mostly handled by npm package though
            export PLAYWRIGHT_BROWSERS_PATH=$PWD/.cache/ms-playwright
          '';
        };
      }
    );
}
