const COLLATERALS = require('../data/collateral');
const createCollateral = require('../instruments/createCollateral');

for (const collateral of COLLATERALS) {
  createCollateral(collateral);
}
