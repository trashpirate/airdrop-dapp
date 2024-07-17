export const PROJECT_NAME = "Airdrop Dapp";
export const PROJECT_DESCRIPTION = "Airdrop Dapp";
export const TOKEN_SYMBOL = "EARN";

export const FEE_TOKEN_CONTRACT = (
  process.env.NEXT_PUBLIC_ENABLE_TESTNET == "true"
    ? "0x714e4e99125c47Bd3226d8B644C147D3Ff8e1e3B"
    : "0x803b629c339941e2b77d2dc499dac9e1fd9eac66"
) as `0x${string}`;
export const AIRDROP_CONTRACT = (
  process.env.NEXT_PUBLIC_ENABLE_TESTNET == "true"
    ? "0xf1b8489f2e119dd023f19984de533f95ff28ecee"
    : ""
) as `0x${string}`;

export const PROJECT_URL = "https://airdrop.buyholdearn.com";
export const PROJECT_ICON = "https://airdrop.buyholdearn/logo.png";
export const PROJECT_DOMAIN = "buyholdearn.com";
export const PROJECT_X = "@buyholdearn";
export const PROJECT_PREVIEW = "https://airdrop.buyholdearn.com/preview.jpg";
