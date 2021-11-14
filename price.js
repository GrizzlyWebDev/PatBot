const { 
	getTokenToBnb,
    getBnbToUsd,
    getTokenBalanceWeb3,
    getTokenTotalSupply,
    getBurnt,
    getTokenTxs,

 } = require('./services/web3');

 async function getTokenData(balance, earned) {
    let decimals = 18;

    let bnbToUsd = await getBnbToUsd();
    let token = "0xe265467d89ed55c2b5fe3cacdac85a7d13adacb1";
    let pair = "0xAD0fa4b1c024c9e9CF92E6941c11058b119A03DD";

    let supply = await getTokenTotalSupply(token, decimals);

    let tokenToBnbResp = await getTokenToBnb(pair, balance);

    let tokenToBnb = tokenToBnbResp.price;

    if (tokenToBnb == null) {
      return;
    }


    let cap =
      parseFloat(supply) *
      (parseFloat(tokenToBnb) *
      parseFloat(bnbToUsd));

    return {
      current: (tokenToBnb * bnbToUsd * 1).toFixed(10),
      cap: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cap),
    };
  };

async function fetchData() {
    let wallet = "0xe265467d89ed55c2b5fe3cacdac85a7d13adacb1";
    let balance = await getTokenBalanceWeb3(
      "0xe265467d89ed55c2b5fe3cacdac85a7d13adacb1",
      wallet,
      18
    );
    let earned = 0;
    if (balance) {
      earned = parseFloat(balance);
    } else {
      earned = 0;
    }
    let tokenData = await getTokenData(balance, earned);
    return tokenData;
};

exports.fetchData = fetchData;  