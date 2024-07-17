# AIRDROP DAPP

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![Node](https://img.shields.io/badge/node-v12.22.9-blue.svg?style=for-the-badge)
![NPM](https://img.shields.io/badge/npm-v10.6.0-blue?style=for-the-badge)
![Nextjs](https://img.shields.io/badge/next-v14.2.3-blue?style=for-the-badge)
![Tailwindcss](https://img.shields.io/badge/TailwindCSS-v3.4.1-blue?style=for-the-badge)
![Wagmi](https://img.shields.io/badge/Wagmi-v2.8.0-blue?style=for-the-badge)
![Viem](https://img.shields.io/badge/Viem-v2.9.31-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/github/license/trashpirate/airdrop-dapp?style=for-the-badge)](https://github.com/trashpirate/airdrop-dapp/blob/main/LICENSE)

[![Website: nadinaoates.com](https://img.shields.io/badge/Portfolio-00e0a7?style=for-the-badge&logo=Website)](https://nadinaoates.com)
[![LinkedIn: nadinaoates](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=LinkedIn&logoColor=f5f5f5)](https://linkedin.com/in/nadinaoates)
[![Twitter: N0\_crypto](https://img.shields.io/badge/@N0\_crypto-black?style=for-the-badge&logo=X)](https://twitter.com/N0\_crypto)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

### ✨ [DApp](https://airdrop.buyholdearn.com)

<!-- ABOUT THE PROJECT -->
## About The Project

This repository contains the code of a minting dapp developed for the NFT collection [Touch Grassy](https://opensea.io/collection/touch-grassy).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Contracts on BASE TESTNET

#### Fee Token on Testnet  
https://sepolia.basescan.org/token/0x714e4e99125c47bd3226d8b644c147d3ff8e1e3b

#### Airdrop Token on Testnet  
https://sepolia.basescan.org/token/0xd8a3d75aa2db08bcefc67cde9cd2b51b981153e1

#### Airdrop Contract on Testnet  
https://sepolia.basescan.org/address/0xf1b8489f2e119dd023f19984de533f95ff28ecee

### Contracts on BASE MAINNET

#### FEE TOKEN Contract Mainnet  

#### NFT Contract Mainnet

<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/trashpirate/airdrop-dapp.git
   ```
2. Navigate to the project directory
   ```sh
   cd airdrop-dapp
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

### Usage

Before running any commands, create a .env file and add the following environment variables. These are configured for BASE chain:

```bash
# dapp configs
NEXT_PUBLIC_PROJECT_NAME="Title"
NEXT_PUBLIC_PROJECT_ID="Project Id from WalletConnect" # https://cloud.walletconnect.com/app
NEXT_PUBLIC_PROJECT_DESCRIPTION="Description"
NEXT_PUBLIC_TOKEN_SYMBOL="Token Symbol"

# chain configs
NEXT_PUBLIC_ALCHEMY_API_KEY=<your API key> # https://www.alchemy.com/

NEXT_PUBLIC_ENABLE_TESTNET=true # toggles to use testnet configuration or mainnet

# smart contract configs (toggle these to switch between testnet and mainnet)
NEXT_PUBLIC_RPC_URL="RPC URL" # e.g. https://www.ankr.com/ or  https://www.alchemy.com/ (depends on chains and your preference)
NEXT_PUBLIC_FEE_TOKEN_CONTRACT="Contract Address"
NEXT_PUBLIC_AIRDROP_CONTRACT="Contract Address"
```


#### Run development server:

```bash
# development
$ npm next dev

# production mode
$ npm next start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Deploy on Vercel:

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Nadina Oates - [@N0_crypto](https://twitter.com/N0_crypto)

Contract Repository: [https://github.com/trashpirate/airdrop-contract](https://github.com/trashpirate/airdrop-contract)

Project Link: [https://app.touchbasedgrass.com/](https://app.touchbasedgrass.com/)


<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments -->

