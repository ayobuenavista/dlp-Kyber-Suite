/* global artifacts */
/* eslint-disable no-unused-vars */
const Network = artifacts.require('./KyberNetwork.sol');
const NetworkProxy = artifacts.require('./KyberNetworkProxy.sol');
const ConversionRates = artifacts.require('./ConversionRates.sol');
const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const FundWallet = artifacts.require('./FundWallet.sol');
const FundReserve = artifacts.require('./KyberFundReserve.sol');
const AutomatedReserve = artifacts.require('./KyberAutomatedReserve.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');
const KNC = artifacts.require('./mockTokens/KyberNetworkCrystal.sol');
const KGT = artifacts.require('./mockTokens/KyberGenesisToken.sol');
const MockFundWallet = artifacts.require('./mockContracts/MockFundWallet.sol');
const TestToken = artifacts.require('./mockContracts/TestToken.sol');
const SwapEtherToToken = artifacts.require('./examples/SwapEtherToToken.sol');
const SwapTokenToEther = artifacts.require('./examples/SwapTokenToEther.sol');
const SwapTokenToToken = artifacts.require('./examples/SwapTokenToToken.sol');
const Trade = artifacts.require('./examples/Trade.sol');
const MANA = artifacts.require('./mockTokens/Mana.sol');

module.exports = async (deployer, network, accounts) => {
  const admin = accounts[0];
  const backupAdmin = accounts[1];

  // Deploy the contracts
  await deployer.deploy(Network, admin);
  await deployer.deploy(NetworkProxy, admin);
  await deployer.deploy(ConversionRates, admin);
  await deployer.deploy(LiquidityConversionRates, admin, MANA.address);
  await deployer.deploy(FundWallet, admin, backupAdmin);
  await deployer.deploy(SanityRates, admin);
  await deployer.deploy(FundReserve, Network.address, ConversionRates.address, FundWallet.address, admin);
  await deployer.deploy(AutomatedReserve, Network.address, LiquidityConversionRates.address, admin);
  await deployer.deploy(FeeBurner, admin, KNC.address, Network.address);
  await deployer.deploy(WhiteList, admin, KGT.address);
  await deployer.deploy(ExpectedRate, Network.address, admin);

  // Deploy the examples
  await deployer.deploy(SwapEtherToToken, NetworkProxy.address);
  await deployer.deploy(SwapTokenToEther, NetworkProxy.address);
  await deployer.deploy(SwapTokenToToken, NetworkProxy.address);
  await deployer.deploy(Trade, NetworkProxy.address);

  await deployer.deploy(MockFundWallet, "60", "60", "60", "60");
  await deployer.deploy(TestToken, "test", "tst", "18");
};
