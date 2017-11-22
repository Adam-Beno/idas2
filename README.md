# idas2
## Prerequisities
- Python 2.7
- node-gyp (npm install -g node-gyp)
- VS14 (Win) / GCC (Linux) / XCode command line tools (Mac)
- oracle instant client 12.* (Basic + SDK)
- vpn to connect to the school network

## Installation
1. Clone repo
1. `yarn install`
   1. Will not work if you don't have gyp, python and c compiler set up
1. `yarn prebuild`
1. `yarn start:dev`

If you fail at step two, get gyp errors and oracledb fails to compile,
check this installation guide made by the node-oracledb team https://github.com/oracle/node-oracledb/blob/master/INSTALL.md
