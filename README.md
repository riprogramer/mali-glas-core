# (NotSo)Naivecoin

Adding Bitcoin-like features to [Naivecoin](https://github.com/conradoqg/naivecoin).

1. Difficulty adjustment

```javascript
const EVERY_X_BLOCKS = 100;
// Estimated completion time for X blocks.
const EXPECTED_BLOCK_COMPLETION_TIME = 604800 // 1 week.

let index = blocks.length - 1;

// Initially assume new blocks difficulty is the same as the one at the end of the chain.
difficulty = blocks[index].difficulty;

// If the index of the block at the end of the chain indicates that a difficulty adjustment may need to take place (for the next block).
if ( index % EVERY_X_BLOCKS == 0 ) {
	
	// Propose to adjust difficulty based on ratio between expected completion time of last block set and actual completion time.
	let adjustment = difficulty * ( EXPECTED_BLOCK_COMPLETION_TIME / ( blocks[index].timestamp - blocks[index - EVERY_X_BLOCKS].timestamp ) );
	
	// Don't make any adjustments that are too extreme.
	if ( adjustment > ( difficulty * 4 ) ) {
		difficulty = difficulty * 4;
	} else if ( adjustment < ( difficulty * 0.25 ) ) {
		difficulty = difficulty * 0.25;
	} else {
		difficulty = adjustment;
	}
	
}

// Return difficulty unchanged, or adjusted.
return difficulty;
```

2. Periodic reward depreciation

```javascript
const REWARD_REDUCTION_BLOCKS = 500;
return module.exports.MINING_REWARD / Math.ceil( blocks.length / REWARD_REDUCTION_BLOCKS );
```

Powering 

* [CoinCoin](https://github.com/martinchapman/coincoin)