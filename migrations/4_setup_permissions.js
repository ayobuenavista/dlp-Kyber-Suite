/* global artifacts */
/* eslint-disable no-unused-vars */
const Network = artifacts.require('./KyberNetwork.sol');
const ConversionRates = artifacts.require('./ConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const FundReserve = artifacts.require('./KyberFundReserve.sol');
const AutomatedReserve = artifacts.require('./KyberAutomatedReserve.sol');
const FeeBurner = artifacts.require('./FeeBurner.sol');
const WhiteList = artifacts.require('./WhiteList.sol');
const ExpectedRate = artifacts.require('./ExpectedRate.sol');

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   Calling ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.tx}`);
  console.log(`   > contract address: ${logs.address}`);
  console.log(`   > gas used: ${result.receipt.gasUsed}`);
  console.log(`   > event: ${logs.event}`);
  console.log();
}

module.exports = async (deployer, network, accounts) => {
  const operator = accounts[1];
  const alerter = accounts[2];

  // Set the instances
  const NetworkInstance = await Network.at(Network.address);
  const ConversionRatesInstance = await ConversionRates.at(ConversionRates.address);
  const SanityRatesInstance = await SanityRates.at(SanityRates.address);
  const FundReserveInstance = await FundReserve.at(FundReserve.address);
  const AutomatedReserveInstance = await AutomatedReserve.at(AutomatedReserve.address);
  const FeeBurnerInstance = await FeeBurner.at(FeeBurner.address);
  const WhiteListInstance = await WhiteList.at(WhiteList.address);
  const ExpectedRateInstance = await ExpectedRate.at(ExpectedRate.address);

  // Set permissions of contracts
  tx(await NetworkInstance.addOperator(operator), 'addOperator()');
  tx(await ConversionRatesInstance.addOperator(operator), 'addOperator()');
  tx(await FundReserveInstance.addOperator(operator), 'addOperator()');
  tx(await FundReserveInstance.addAlerter(alerter), 'addAlerter()');
  tx(await AutomatedReserveInstance.addOperator(operator), 'addOperator()');
  tx(await AutomatedReserveInstance.addAlerter(alerter), 'addAlerter()');
  tx(await FeeBurnerInstance.addOperator(operator), 'addOperator()');
  tx(await WhiteListInstance.addOperator(operator), 'addOperator()');
  tx(await ExpectedRateInstance.addOperator(operator), 'addOperator()');
  tx(await SanityRatesInstance.addOperator(operator), 'addOperator()');
};
