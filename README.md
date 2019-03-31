# [Working Title] Übermensch #
A blockchain based commitment platform
-----
Authors: Ash Woolf, Hendrik Neumann, Jin Rhee, Zorawar Moolenaar

## Prerequisites ##
Node.js & npm --- [Available here](https://nodejs.org/en/download/) or through a package manager

## Setup ##
1. clone repo
2. `npm install ganache-cli && npm && ln -s node_modules/.bin/ganache-cli .` The npm installation will cause a lot of output. Believe it or not, it's not malware.
3. In a separet terminal run `./ganache-cli`, and make sure it is listening on `localhost:8545` (default)
4. Navigate to <https://remix.ethereum.org> in a browser.
5. On the top left, click the folder icon and upload `contracts/*.sol`
6. Click on `Manager.sol` in the left panel, and then compile using the right panel.
7.  On the right, in "Environment", choose "Web3 Provider". Hit ok on the dialog box, and accept the default URL "https://localhost:8545". Iff any issues, make sure that ganache is running.
8. Right below, Select "Manager" and hit "Deploy". 
9. Paste this address in "abi.js" at contractAddress.
10. the application *should* be ready :)

